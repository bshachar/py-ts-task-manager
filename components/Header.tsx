
import React from 'react';
import { ViewMode } from '../App';
import { Icon, PlusIcon, ViewColumnsIcon, Bars3Icon } from './Icon';

interface HeaderProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onAddTask: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, onViewChange, onAddTask, onLogout }) => {
  const baseButtonClass = "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors";
  const activeButtonClass = "bg-slate-700 text-white";
  const inactiveButtonClass = "text-gray-400 hover:bg-slate-800 hover:text-white";

  return (
    <header className="flex items-center justify-between p-4 border-b border-slate-800 flex-shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">המשימות שלי</h1>
        <div className="flex items-center bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => onViewChange('board')}
            className={`${baseButtonClass} ${viewMode === 'board' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Icon svg={ViewColumnsIcon} />
            לוח
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`${baseButtonClass} ${viewMode === 'list' ? activeButtonClass : inactiveButtonClass}`}
          >
            <Icon svg={Bars3Icon} />
            רשימה
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors"
        >
          <Icon svg={PlusIcon} />
          הוסף משימה
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 text-sm font-medium text-gray-300 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
        >
          התנתק
        </button>
      </div>
    </header>
  );
};

export default Header;
