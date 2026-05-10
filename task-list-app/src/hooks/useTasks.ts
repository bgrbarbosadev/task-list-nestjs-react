import { useEffect, useState } from 'react';
import { Task, TaskFormValues } from '../types/index';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from '../services/tasks';

const TASKS_PER_PAGE = 5;

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Não foi possível carregar as tarefas. Verifique o backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(tasks.length / TASKS_PER_PAGE));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, tasks.length]);

  const handleCreate = async (values: TaskFormValues) => {
    const newTask = await createTask(values);
    setTasks((current) => [newTask, ...current]);
    setPage(1);
  };

  const handleUpdate = async (id: number, values: TaskFormValues) => {
    const updatedTask = await updateTask(id, values);
    setTasks((current) => current.map((task) => (task.id === id ? updatedTask : task)));
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks((current) => {
      const nextTasks = current.filter((task) => task.id !== id);
      const totalPages = Math.max(1, Math.ceil(nextTasks.length / TASKS_PER_PAGE));
      if (page > totalPages) {
        setPage(totalPages);
      }
      return nextTasks;
    });
  };

  const handleToggleStatus = async (task: Task) => {
    const updatedTask = await toggleTaskStatus(task);
    setTasks((current) => current.map((item) => (item.id === task.id ? updatedTask : item)));
  };

  return {
    tasks,
    loading,
    error,
    page,
    setPage,
    loadTasks,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  };
};