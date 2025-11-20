import { useState, useCallback, useEffect } from 'react';
import { Task } from '../types';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export const useTasks = (searchQuery: string = '') => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    try {
      const params: any = {};
      if (searchQuery && searchQuery.trim() !== '') {
        params.search = searchQuery;
      }
      const response = await api.get('/tasks/', { params });
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, searchQuery]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = useCallback(async (task: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      const response = await api.post('/tasks/', task);
      setTasks(prevTasks => [...prevTasks, response.data]);
    } catch (error) {
      console.error('Failed to add task', error);
    }
  }, []);

  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === updatedTask.id ? response.data : task))
      );
    } catch (error) {
      console.error('Failed to update task', error);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  }, []);

  return { tasks, addTask, updateTask, deleteTask, loading };
};
