# המשימות שלי - סיכום פרויקט

## סקירה כללית
אפליקציית ניהול משימות מלאה עם ממשק בעברית (RTL), Backend ב-Python, ו-Frontend ב-TypeScript.

## תכונות עיקריות

### 🎨 ממשק משתמש
- ✅ **עברית מלאה** - כל הטקסטים בעברית
- ✅ **RTL (Right-to-Left)** - תמיכה מלאה בכיוון מימין לשמאל
- ✅ **עיצוב Linear** - עיצוב מודרני ומינימליסטי
- ✅ **שתי תצוגות**: לוח (Kanban) ורשימה
- ✅ **Drag & Drop** - גרירת משימות בין עמודות

### 🔐 אבטחה ואימות
- ✅ **התחברות והרשמה** - מערכת אימות מלאה
- ✅ **JWT Tokens** - אבטחה מבוססת טוקנים
- ✅ **הצפנת סיסמאות** - Argon2 hashing
- ✅ **כפתור התנתקות** - בכותרת העליונה

### 📊 ניהול משימות
- ✅ **CRUD מלא** - יצירה, קריאה, עדכון, מחיקה
- ✅ **סטטוסים**: צבר עבודות, לביצוע, בביצוע, הושלם
- ✅ **עדיפויות**: דחוף, גבוהה, בינונית, נמוכה, ללא עדיפות
- ✅ **אישור מחיקה** - הודעת אישור לפני מחיקת משימה

### 🔍 חיפוש ומיון
- ✅ **חיפוש בזמן אמת** - בכותרת ובתיאור
- ✅ **מיון בעמודות** - לחיצה על כותרת עמודה למיון
- ✅ **אינדיקטורים חזותיים** - חיצים המציגים כיוון מיון

### 💾 Backend (Python/FastAPI)
- ✅ **FastAPI** - מסגרת מודרנית ומהירה
- ✅ **SQLAlchemy** - ORM למסד נתונים
- ✅ **SQLite** - מסד נתונים מקומי
- ✅ **Pydantic** - ולידציה ותרגום אוטומטי
- ✅ **CORS** - תמיכה ב-Cross-Origin Requests

### 🎯 Frontend (React/TypeScript)
- ✅ **React 19** - גרסה עדכנית
- ✅ **TypeScript** - Type safety
- ✅ **Vite** - Build tool מהיר
- ✅ **Tailwind CSS** - עיצוב responsive
- ✅ **Axios** - HTTP client

## מבנה הפרויקט

```
py-ts-task-manager/
├── backend/
│   ├── main.py           # FastAPI app
│   ├── models.py         # Database models
│   ├── schemas.py        # Pydantic schemas + translation
│   ├── auth.py           # Authentication
│   ├── database.py       # DB configuration
│   └── requirements.txt  # Python dependencies
├── components/
│   ├── Header.tsx        # כותרת עליונה
│   ├── Auth.tsx          # התחברות/הרשמה
│   ├── KanbanBoard.tsx   # תצוגת לוח
│   ├── ListView.tsx      # תצוגת רשימה
│   ├── TaskModal.tsx     # חלון עריכת משימה
│   └── ...
├── hooks/
│   └── useTasks.ts       # Custom hook לניהול משימות
├── context/
│   └── AuthContext.tsx   # Context לאימות
├── App.tsx               # קומפוננטה ראשית
├── types.ts              # TypeScript types
└── api.ts                # Axios configuration

```

## טכנולוגיות

### Backend
- **Python 3.9+**
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **python-jose** - JWT
- **passlib** - Password hashing (Argon2)

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Axios**

## הפעלה

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
השרת יעלה על: `http://localhost:8000`

### Frontend
```bash
npm install
npm run dev
```
האפליקציה תעלה על: `http://localhost:5173`

## תכונות מיוחדות

### מערכת תרגום אוטומטית
- **Backend**: שומר נתונים באנגלית (תאימות לאחור)
- **API**: מחזיר ערכים בעברית
- **Pydantic Validators**: ממירים אוטומטית בין עברית לאנגלית
- **Frontend**: מציג הכל בעברית

### חיפוש חכם
- חיפוש בשרת (case-insensitive)
- תמיכה בעברית ובאנגלית
- שדה ריק = כל המשימות
- עדכון בזמן אמת

### מיון דינמי
- מיון לפי כותרת, סטטוס, עדיפות
- החלפת כיוון בלחיצה נוספת
- אינדיקטורים חזותיים (↑/↓)

## קבצי תיעוד
- `README.md` - הוראות התקנה והפעלה
- `HEBREW_TRANSLATION.md` - תיעוד תרגום לעברית
- `ADDITIONAL_UPDATES.md` - תכונות נוספות
- `SEARCH_FIX.md` - תיקון בעיות חיפוש

## אבטחה
⚠️ **חשוב**: בסביבת ייצור, יש לשנות:
- `SECRET_KEY` ב-`backend/auth.py`
- להשתמש במסד נתונים ייעודי (PostgreSQL/MySQL)
- להגדיר CORS נכון
- להשתמש ב-HTTPS

## רישיון
פרויקט זה נוצר כדוגמה חינוכית.

---

**נוצר עם ❤️ בעברית**
