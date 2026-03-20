
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import TaskModal from './components/TaskModal';
import LoginPage from './components/LoginPage';
import { useTasks } from './hooks/useTasks';
import { Task, Status, Priority } from './types';

export type ViewMode = 'board' | 'list';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const { tasks, loading, addTask, updateTask, deleteTask, refreshTasks } = useTasks(isConnected);
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check initial auth status
    fetch('/api/auth/status')
      .then(res => res.json())
      .then(data => setIsConnected(data.connected))
      .catch(console.error);

    // Listen for OAuth popup success
    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) {
        return;
      }
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        setIsConnected(true);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleConnectGoogle = async () => {
    try {
      const response = await fetch('/api/auth/url');
      if (!response.ok) throw new Error('Failed to get auth URL');
      const { url } = await response.json();

      const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
      if (!authWindow) {
        alert('Please allow popups for this site to connect your Google account.');
      }
    } catch (error) {
      console.error('OAuth error:', error);
    }
  };

  const handleDisconnectGoogle = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsConnected(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (statusFilter !== 'All' && task.status !== statusFilter) return false;
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        if (!task.title.toLowerCase().includes(query) && 
            !task.description.toLowerCase().includes(query)) {
          return false;
        }
      }
      return true;
    });
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    handleCloseModal();
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    handleCloseModal();
  }

  if (!isConnected) {
    return <LoginPage onConnectGoogle={handleConnectGoogle} />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 text-gray-200 font-sans antialiased">
      <Header
        viewMode={viewMode}
        onViewChange={setViewMode}
        onAddTask={() => handleOpenModal()}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isConnected={isConnected}
        onConnectGoogle={handleConnectGoogle}
        onDisconnectGoogle={handleDisconnectGoogle}
      />
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 lg:p-8 relative">
        {loading && (
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center z-10">
            <div className="text-indigo-400 font-medium">Loading tasks...</div>
          </div>
        )}
        {viewMode === 'board' ? (
          <KanbanBoard tasks={filteredTasks} onEditTask={handleOpenModal} updateTask={updateTask} />
        ) : (
          <ListView tasks={filteredTasks} onEditTask={handleOpenModal} onDeleteTask={deleteTask} />
        )}
      </main>
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTask}
          task={editingTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
