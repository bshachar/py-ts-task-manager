
import React from 'react';
import { Task, Status } from '../types';
import KanbanColumn from './KanbanColumn';
import { KANBAN_COLUMNS } from '../constants';

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onEditTask, updateTask }) => {
  const handleTaskDrop = (taskId: string, newStatus: Status) => {
    const taskToMove = tasks.find(t => t.id === taskId);
    if (taskToMove && taskToMove.status !== newStatus) {
      updateTask({ ...taskToMove, status: newStatus });
    }
  };

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-2">
      {KANBAN_COLUMNS.map(column => (
        <KanbanColumn
          key={column.title}
          title={column.title}
          color={column.color}
          tasks={tasks.filter(task => task.status === column.title)}
          onEditTask={onEditTask}
          onTaskDrop={handleTaskDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
