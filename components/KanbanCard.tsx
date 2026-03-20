
import React from 'react';
import { Task, Priority } from '../types';
import { Icon, Bars3BottomLeftIcon, SignalIcon, ExclamationCircleIcon, ShieldCheckIcon, MinusIcon, CalendarIcon } from './Icon';

interface KanbanCardProps {
  task: Task;
  onEditTask: (task: Task) => void;
}

const priorityConfig = {
    [Priority.Urgent]: { icon: ExclamationCircleIcon, color: 'text-red-400' },
    [Priority.High]: { icon: SignalIcon, color: 'text-orange-400' },
    [Priority.Medium]: { icon: Bars3BottomLeftIcon, color: 'text-yellow-400' },
    [Priority.Low]: { icon: ShieldCheckIcon, color: 'text-blue-400' },
    [Priority.NoPriority]: { icon: MinusIcon, color: 'text-gray-500' },
};

const KanbanCard: React.FC<KanbanCardProps> = ({ task, onEditTask }) => {
  const { icon, color } = priorityConfig[task.priority] || priorityConfig[Priority.NoPriority];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    e.currentTarget.style.opacity = '0.5';
    e.currentTarget.style.transform = 'rotate(3deg)';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'rotate(0deg)';
  };

  return (
    <div
      onClick={() => onEditTask(task)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="p-4 w-full bg-slate-800 rounded-lg border border-slate-700 hover:border-indigo-500 cursor-grab active:cursor-grabbing transition-all duration-200 flex flex-col"
      style={{ height: '200px' }}
    >
      <h3 className="font-medium text-gray-200 mb-2">{task.title}</h3>
      <p className="text-sm text-gray-400 mb-2 line-clamp-2 flex-1">{task.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Icon svg={CalendarIcon} className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Icon svg={icon} className={`${color} w-4 h-4`} />
          <span className="text-xs text-gray-400">{task.priority}</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
