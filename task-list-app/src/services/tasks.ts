import { api } from '../api';
import { Task, TaskFormValues } from '../types/index';

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (values: TaskFormValues): Promise<Task> => {
  const response = await api.post<Task>('/tasks', values);
  return response.data;
};

export const updateTask = async (id: number, values: TaskFormValues): Promise<Task> => {
  const response = await api.put<Task>(`/tasks/${id}`, values);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTaskStatus = async (task: Task): Promise<Task> => {
  const nextStatus = task.status === 'DONE' ? 'PENDING' : 'DONE';
  const response = await api.put<Task>(`/tasks/${task.id}`, { status: nextStatus });
  return response.data;
};