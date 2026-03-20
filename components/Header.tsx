
import React from 'react';
import { ViewMode } from '../App';
import { Icon, PlusIcon, ViewColumnsIcon, Bars3Icon, MagnifyingGlassIcon } from './Icon';
import { Status, Priority } from '../types';

interface HeaderProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onAddTask: () => void;
  statusFilter: Status | 'All';
  setStatusFilter: (status: Status | 'All') => void;
  priorityFilter: Priority | 'All';
  setPriorityFilter: (priority: Priority | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isConnected: boolean;
  onConnectGoogle: () => void;
  onDisconnectGoogle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  viewMode, 
  onViewChange, 
  onAddTask,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  searchQuery,
  setSearchQuery,
  isConnected,
  onConnectGoogle,
  onDisconnectGoogle
}) => {
  const baseButtonClass = "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors";
  const activeButtonClass = "bg-slate-700 text-white";
  const inactiveButtonClass = "text-gray-400 hover:bg-slate-800 hover:text-white";

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border-b border-slate-800 flex-shrink-0 gap-4">
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <h1 className="text-xl font-bold text-white">TaskFlow</h1>
        <div className="flex items-center bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => onViewChange('board')}
            className={`${baseButtonClass} ${viewMode === 'board' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Icon svg={ViewColumnsIcon} />
            <span className="hidden sm:inline">Board</span>
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`${baseButtonClass} ${viewMode === 'list' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Icon svg={Bars3Icon} />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:flex-grow-0 w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon svg={MagnifyingGlassIcon} className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 text-white text-sm rounded-md pl-9 pr-3 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-48 transition-all focus:md:w-64"
          />
        </div>

        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <label htmlFor="status-filter" className="text-sm text-gray-400 hidden sm:block">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
            className="bg-slate-800 text-white text-sm rounded-md px-2 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="All">All Status</option>
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <label htmlFor="priority-filter" className="text-sm text-gray-400 hidden sm:block">Priority:</label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | 'All')}
            className="bg-slate-800 text-white text-sm rounded-md px-2 py-1.5 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
          >
            <option value="All">All Priority</option>
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
        
        <div className="hidden md:block h-6 w-px bg-slate-700 mx-1"></div>

        <div className="flex items-center gap-2 ml-auto w-full sm:w-auto justify-end mt-2 sm:mt-0">
          <button
            onClick={onDisconnectGoogle}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-md hover:bg-slate-700 transition-colors"
            title="Disconnect"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
            </svg>
            <span className="hidden sm:inline">Disconnect</span>
          </button>

          <button
            onClick={onAddTask}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors"
          >
            <Icon svg={PlusIcon} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
