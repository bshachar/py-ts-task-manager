
import { Status } from './types';

export const KANBAN_COLUMNS: { title: Status; color: string }[] = [
  { title: Status.Backlog, color: 'bg-gray-500' },
  { title: Status.Todo, color: 'bg-blue-500' },
  { title: Status.InProgress, color: 'bg-yellow-500' },
  { title: Status.Done, color: 'bg-green-500' },
];
