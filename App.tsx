
import React, { useState } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import TaskModal from './components/TaskModal';
import Auth from './components/Auth';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';
import { useAuth } from './context/AuthContext';

export type ViewMode = 'board' | 'list';

function App() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks, addTask, updateTask, deleteTask, loading: tasksLoading } = useTasks(searchQuery);
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (authLoading) {
    return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">טוען...</div>;
  }

  if (!isAuthenticated) {
    return <Auth />;
  }

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

  return (
    <div className="flex flex-col h-full bg-slate-900 text-gray-200 font-sans antialiased">
      <Header
        viewMode={viewMode}
        onViewChange={setViewMode}
        onAddTask={() => handleOpenModal()}
        onLogout={logout}
      />
      <div className="px-4 sm:px-6 lg:px-8 pt-4">
        <div className="max-w-md mx-auto">
          <div className="relative" dir="rtl">
            <input
              type="text"
              placeholder="חיפוש משימות..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 lg:p-8">
        {tasksLoading ? (
          <div className="flex items-center justify-center h-full text-slate-500">טוען משימות...</div>
        ) : (
          viewMode === 'board' ? (
            <KanbanBoard tasks={tasks} onEditTask={handleOpenModal} updateTask={updateTask} />
          ) : (
            <ListView tasks={tasks} onEditTask={handleOpenModal} onDeleteTask={deleteTask} />
          )
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
