
import React from 'react';
import { Task } from '../types';
import TaskRow from './TaskRow';

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const ListView: React.FC<ListViewProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <table className="w-full text-left">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Task ID</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <TaskRow 
                  key={task.id} 
                  task={task} 
                  onEditTask={onEditTask} 
                  onDeleteTask={onDeleteTask}
                  isLast={index === tasks.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListView;
