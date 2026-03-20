import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser(process.env.SESSION_SECRET || 'fallback_secret_for_dev'));

// Google OAuth2 Client
const getOAuth2Client = (req: express.Request) => {
  const host = req.headers['x-forwarded-host'] || req.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const redirectUri = `${protocol}://${host}/auth/callback`;
  
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );
};

// --- API Routes ---

// 1. Get OAuth URL
app.get('/api/auth/url', (req, res) => {
  const oauth2Client = getOAuth2Client(req);
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/tasks',
      'https://www.googleapis.com/auth/userinfo.profile'
    ],
    prompt: 'consent'
  });
  res.json({ url });
});

// 2. OAuth Callback
app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  if (!code || typeof code !== 'string') {
    return res.status(400).send('Missing code');
  }

  try {
    const oauth2Client = getOAuth2Client(req);
    const { tokens } = await oauth2Client.getToken(code);
    
    // Store tokens in a secure, HTTP-only cookie
    res.cookie('google_tokens', JSON.stringify(tokens), {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      signed: true,
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('OAuth Error:', error);
    res.status(500).send('Authentication failed');
  }
});

// 3. Auth Status
app.get('/api/auth/status', (req, res) => {
  const tokens = req.signedCookies.google_tokens;
  res.json({ connected: !!tokens });
});

// 4. Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('google_tokens', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.json({ success: true });
});

// Middleware to check auth and attach Google Tasks client
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const tokensStr = req.signedCookies.google_tokens;
  if (!tokensStr) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const tokens = JSON.parse(tokensStr);
    const oauth2Client = getOAuth2Client(req);
    oauth2Client.setCredentials(tokens);
    
    // Refresh token logic is handled automatically by googleapis if refresh_token is present
    (req as any).tasksClient = google.tasks({ version: 'v1', auth: oauth2Client });
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid tokens' });
  }
};

// Helper to parse/stringify our custom metadata
const parseMetadata = (notes: string | null | undefined) => {
  if (!notes) return { description: '', status: 'To Do', priority: 'No Priority' };
  const parts = notes.split('\\n\\n---APP_META---\\n');
  const description = parts[0] || '';
  let meta = { status: 'To Do', priority: 'No Priority' };
  if (parts.length > 1) {
    try {
      meta = { ...meta, ...JSON.parse(parts[1]) };
    } catch (e) {
      // ignore
    }
  }
  return { description, ...meta };
};

const stringifyMetadata = (description: string, status: string, priority: string) => {
  const meta = JSON.stringify({ status, priority });
  return `${description || ''}\\n\\n---APP_META---\\n${meta}`;
};

// 5. Get Tasks
app.get('/api/tasks', requireAuth, async (req, res) => {
  try {
    const tasksClient = (req as any).tasksClient;
    // We use the default task list '@default'
    const response = await tasksClient.tasks.list({
      tasklist: '@default',
      showHidden: true,
      maxResults: 100
    });

    const googleTasks = response.data.items || [];
    const tasks = googleTasks.map((gt: any) => {
      const { description, status, priority } = parseMetadata(gt.notes);
      
      // Map Google's status to ours if meta is missing
      let finalStatus = status;
      if (gt.status === 'completed' && status !== 'Done') finalStatus = 'Done';
      if (gt.status === 'needsAction' && status === 'Done') finalStatus = 'To Do';

      return {
        id: gt.id,
        title: gt.title || 'Untitled Task',
        description,
        status: finalStatus,
        priority,
        createdAt: gt.updated || new Date().toISOString(),
        dueDate: gt.due || undefined
      };
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// 6. Create Task
app.post('/api/tasks', requireAuth, async (req, res) => {
  try {
    const tasksClient = (req as any).tasksClient;
    const { title, description, status, priority, dueDate } = req.body;

    const notes = stringifyMetadata(description, status, priority);
    const googleStatus = status === 'Done' ? 'completed' : 'needsAction';

    const requestBody: any = {
      title,
      notes,
      status: googleStatus
    };
    if (dueDate) {
      requestBody.due = new Date(dueDate).toISOString();
    }

    const response = await tasksClient.tasks.insert({
      tasklist: '@default',
      requestBody
    });

    const gt = response.data;
    res.json({
      id: gt.id,
      title: gt.title,
      description,
      status,
      priority,
      createdAt: gt.updated,
      dueDate: gt.due || undefined
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// 7. Update Task
app.put('/api/tasks/:id', requireAuth, async (req, res) => {
  try {
    const tasksClient = (req as any).tasksClient;
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const notes = stringifyMetadata(description, status, priority);
    const googleStatus = status === 'Done' ? 'completed' : 'needsAction';

    const requestBody: any = {
      id,
      title,
      notes,
      status: googleStatus
    };
    if (dueDate) {
      requestBody.due = new Date(dueDate).toISOString();
    } else {
      requestBody.due = null;
    }

    const response = await tasksClient.tasks.update({
      tasklist: '@default',
      task: id,
      requestBody
    });

    const gt = response.data;
    res.json({
      id: gt.id,
      title: gt.title,
      description,
      status,
      priority,
      createdAt: gt.updated,
      dueDate: gt.due || undefined
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// 8. Delete Task
app.delete('/api/tasks/:id', requireAuth, async (req, res) => {
  try {
    const tasksClient = (req as any).tasksClient;
    const { id } = req.params;

    await tasksClient.tasks.delete({
      tasklist: '@default',
      task: id
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
