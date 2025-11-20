
import React, { useState, useEffect, Fragment } from 'react';
import { Task, Status, Priority } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
  task: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<string>(Status.Backlog);
  const [priority, setPriority] = useState<string>(Priority.NoPriority);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      setTitle('');
      setDescription('');
      setStatus(Status.Todo);
      setPriority(Priority.NoPriority);
    }
  }, [task, isOpen]);

  const handleSave = () => {
    const savedTask: Task = {
      id: task ? task.id : '', // ID will be generated in useTasks hook for new tasks
      createdAt: task ? task.createdAt : '', // createdAt will be generated too
      title,
      description,
      status,
      priority,
    };
    onSave(savedTask);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{task ? 'ערוך משימה' : 'הוסף משימה חדשה'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">כותרת</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">תיאור</label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-1">סטטוס</label>
              <select
                id="status"
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-400 mb-1">עדיפות</label>
              <select
                id="priority"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            {task && (
              <button
                onClick={() => {
                  if (window.confirm(`האם אתה בטוח שברצונך למחוק את "${task.title}"?`)) {
                    onDelete(task.id);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-red-400 rounded-md hover:bg-red-500 hover:text-white transition-colors"
              >
                מחק משימה
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
            >
              ביטול
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
            >
              {task ? 'שמור שינויים' : 'צור משימה'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
