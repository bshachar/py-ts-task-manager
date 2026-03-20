
import React from 'react';
import { Task, Status, Priority } from '../types';
import { Icon, PencilIcon, TrashIcon, Bars3BottomLeftIcon, SignalIcon, ExclamationCircleIcon, ShieldCheckIcon, MinusIcon } from './Icon';

interface TaskRowProps {
  task: Task;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  isLast: boolean;
}

const statusColors: Record<Status, string> = {
  [Status.Backlog]: 'bg-gray-500 text-gray-100',
  [Status.Todo]: 'bg-blue-500 text-blue-100',
  [Status.InProgress]: 'bg-yellow-500 text-yellow-900',
  [Status.Done]: 'bg-green-500 text-green-100',
};

const priorityConfig = {
    [Priority.Urgent]: { icon: ExclamationCircleIcon, color: 'text-red-400' },
    [Priority.High]: { icon: SignalIcon, color: 'text-orange-400' },
    [Priority.Medium]: { icon: Bars3BottomLeftIcon, color: 'text-yellow-400' },
    [Priority.Low]: { icon: ShieldCheckIcon, color: 'text-blue-400' },
    [Priority.NoPriority]: { icon: MinusIcon, color: 'text-gray-500' },
};


const TaskRow: React.FC<TaskRowProps> = ({ task, onEditTask, onDeleteTask, isLast }) => {
  const { icon, color } = priorityConfig[task.priority] || priorityConfig[Priority.NoPriority];

  return (
    <tr className={`hover:bg-slate-750 transition-colors ${isLast ? '' : 'border-b border-slate-700'}`}>
      <td className="px-6 py-4 text-sm font-medium text-gray-200 w-1/3 max-w-0 truncate" title={task.title}>{task.title}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <div className={`flex items-center gap-2 ${color}`}>
            <Icon svg={icon} className="w-4 h-4"/>
            {task.priority}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-4">
          <button onClick={() => onEditTask(task)} className="text-indigo-400 hover:text-indigo-300">
            <Icon svg={PencilIcon} />
          </button>
          <button onClick={() => onDeleteTask(task.id)} className="text-red-400 hover:text-red-300">
            <Icon svg={TrashIcon} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TaskRow;
