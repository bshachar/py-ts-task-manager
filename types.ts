
export enum Status {
  Backlog = 'Backlog',
  Todo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export enum Priority {
  NoPriority = 'No Priority',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Urgent = 'Urgent',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
}
