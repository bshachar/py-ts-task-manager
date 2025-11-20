
import { useState, useCallback } from 'react';
import { Task, Status, Priority } from '../types';

const initialTasks: Task[] = [
  { id: 'TASK-1', title: 'Design the new dashboard', description: 'Create mockups and wireframes for the new dashboard design.', status: Status.Todo, priority: Priority.High, createdAt: new Date().toISOString() },
  { id: 'TASK-2', title: 'Develop user authentication', description: 'Implement JWT-based authentication for the application.', status: Status.InProgress, priority: Priority.Urgent, createdAt: new Date().toISOString() },
  { id: 'TASK-3', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for continuous integration and deployment.', status: Status.Done, priority: Priority.Medium, createdAt: new Date().toISOString() },
  { id: 'TASK-4', title: 'Write API documentation', description: 'Use Swagger/OpenAPI to document all backend endpoints.', status: Status.Backlog, priority: Priority.Low, createdAt: new Date().toISOString() },
  { id: 'TASK-5', title: 'User feedback session', description: 'Schedule and conduct a user feedback session for the beta version.', status: Status.Todo, priority: Priority.Medium, createdAt: new Date().toISOString() },
  { id: 'TASK-6', title: 'Fix login button bug', description: 'The login button is not responsive on mobile devices.', status: Status.InProgress, priority: Priority.High, createdAt: new Date().toISOString() },
  { id: 'TASK-7', title: 'Refactor database schema', description: 'Optimize the database schema for better performance.', status: Status.Backlog, priority: Priority.Low, createdAt: new Date().toISOString() },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: `TASK-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  return { tasks, addTask, updateTask, deleteTask };
};
