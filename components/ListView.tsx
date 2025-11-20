
import React, { useState } from 'react';
import { Task } from '../types';
import TaskRow from './TaskRow';

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

type SortField = 'title' | 'status' | 'priority' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const ListView: React.FC<ListViewProps> = ({ tasks, onEditTask, onDeleteTask }) => {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    // For date sorting
    if (sortField === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-gray-600">⇅</span>;
    return <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="w-full h-full overflow-y-auto" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-lg border border-slate-700">
          <table className="w-full text-right">
            <thead className="border-b border-slate-700">
              <tr>
                <th
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center justify-start gap-2">
                    כותרת <SortIcon field="title" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center justify-start gap-2">
                    סטטוס <SortIcon field="status" />
                  </div>
                </th>
                <th
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center justify-start gap-2">
                    עדיפות <SortIcon field="priority" />
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">פעולות</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task, index) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                  isLast={index === sortedTasks.length - 1}
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
