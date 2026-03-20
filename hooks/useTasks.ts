
import { useState, useCallback, useEffect } from 'react';
import { Task, Status, Priority } from '../types';

const initialTasks: Task[] = [
  { id: 'TASK-1', title: 'Design the new dashboard', description: 'Create mockups and wireframes for the new dashboard design.', status: Status.Todo, priority: Priority.High, createdAt: new Date().toISOString() },
  { id: 'TASK-2', title: 'Develop user authentication', description: 'Implement JWT-based authentication for the application.', status: Status.InProgress, priority: Priority.Urgent, createdAt: new Date().toISOString() },
  { id: 'TASK-3', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for continuous integration and deployment.', status: Status.Done, priority: Priority.Medium, createdAt: new Date().toISOString() },
];

export const useTasks = (isConnected: boolean) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!isConnected) return;
    setLoading(true);
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      fetchTasks();
    } else {
      setTasks(initialTasks);
    }
  }, [isConnected, fetchTasks]);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    if (isConnected) {
      try {
        const res = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
        if (res.ok) {
          const newTask = await res.json();
          setTasks(prev => [...prev, newTask]);
        }
      } catch (error) {
        console.error('Failed to add task:', error);
      }
    } else {
      const newTask: Task = {
        ...task,
        id: `TASK-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  }, [isConnected]);

  const updateTask = useCallback(async (updatedTask: Task) => {
    if (isConnected) {
      try {
        const res = await fetch(`/api/tasks/${updatedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTask),
        });
        if (res.ok) {
          const newTask = await res.json();
          setTasks(prevTasks =>
            prevTasks.map(task => (task.id === newTask.id ? newTask : task))
          );
        }
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    } else {
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
      );
    }
  }, [isConnected]);

  const deleteTask = useCallback(async (taskId: string) => {
    if (isConnected) {
      try {
        const res = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        }
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    } else {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  }, [isConnected]);

  return { tasks, loading, addTask, updateTask, deleteTask, refreshTasks: fetchTasks };
};
