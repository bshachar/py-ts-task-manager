
import React, { useState } from 'react';
import { Task, Status } from '../types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  title: Status;
  color: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onTaskDrop: (taskId: string, newStatus: Status) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, color, tasks, onEditTask, onTaskDrop }) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggedOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onTaskDrop(taskId, title);
    }
    setIsDraggedOver(false);
  };

  return (
    <div
      className={`flex flex-col w-full md:w-80 lg:w-96 flex-shrink-0 h-full rounded-lg transition-colors duration-200 ${isDraggedOver ? 'bg-slate-850' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4 px-1 pt-1">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${color}`}></span>
          <h2 className="font-semibold text-gray-300">{title}</h2>
        </div>
        <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-slate-800 rounded-full">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-auto pb-4 pr-2 -mr-2 h-full">
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} onEditTask={onEditTask} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
