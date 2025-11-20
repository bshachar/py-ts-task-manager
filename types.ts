
export enum Status {
  Backlog = 'צבר עבודות',
  Todo = 'לביצוע',
  InProgress = 'בביצוע',
  Done = 'הושלם',
}

export enum Priority {
  NoPriority = 'ללא עדיפות',
  Low = 'נמוכה',
  Medium = 'בינונית',
  High = 'גבוהה',
  Urgent = 'דחוף',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;  // Changed to string to accept Hebrew values from backend
  priority: string;  // Changed to string to accept Hebrew values from backend
  createdAt: string;
}
