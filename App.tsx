
import React, { useState } from 'react';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import ListView from './components/ListView';
import TaskModal from './components/TaskModal';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';

export type ViewMode = 'board' | 'list';

function App() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
      />
      <main className="flex-1 overflow-x-auto overflow-y-hidden p-4 sm:p-6 lg:p-8">
        {viewMode === 'board' ? (
          <KanbanBoard tasks={tasks} onEditTask={handleOpenModal} updateTask={updateTask} />
        ) : (
          <ListView tasks={tasks} onEditTask={handleOpenModal} onDeleteTask={deleteTask} />
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
