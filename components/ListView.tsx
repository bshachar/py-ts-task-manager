
import React, { useState, useMemo } from 'react';
import { Task, Priority, Status } from '../types';
import TaskRow from './TaskRow';
import { Icon, ChevronUpIcon, ChevronDownIcon } from './Icon';

type SortField = 'title' | 'createdAt' | 'priority' | 'status' | 'dueDate';
type SortDirection = 'asc' | 'desc';

interface ListViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityOrder: Record<Priority, number> = {
  [Priority.Urgent]: 5,
  [Priority.High]: 4,
  [Priority.Medium]: 3,
  [Priority.Low]: 2,
  [Priority.NoPriority]: 1,
};

const statusOrder: Record<Status, number> = {
  [Status.Backlog]: 1,
  [Status.Todo]: 2,
  [Status.InProgress]: 3,
  [Status.Done]: 4,
};

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

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      if (sortField === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortField === 'createdAt') {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === 'priority') {
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortField === 'status') {
        comparison = statusOrder[a.status] - statusOrder[b.status];
      } else if (sortField === 'dueDate') {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        comparison = dateA - dateB;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tasks, sortField, sortDirection]);

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return (
      <Icon 
        svg={sortDirection === 'asc' ? ChevronUpIcon : ChevronDownIcon} 
        className="w-4 h-4 inline-block ml-1" 
      />
    );
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="border-b border-slate-700">
              <tr>
                <th 
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none w-1/3"
                  onClick={() => handleSort('title')}
                >
                  Title {renderSortIcon('title')}
                </th>
                <th 
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none"
                  onClick={() => handleSort('status')}
                >
                  Status {renderSortIcon('status')}
                </th>
                <th 
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none"
                  onClick={() => handleSort('priority')}
                >
                  Priority {renderSortIcon('priority')}
                </th>
                <th 
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none"
                  onClick={() => handleSort('dueDate')}
                >
                  Due Date {renderSortIcon('dueDate')}
                </th>
                <th 
                  className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-200 select-none"
                  onClick={() => handleSort('createdAt')}
                >
                  Created {renderSortIcon('createdAt')}
                </th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
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
