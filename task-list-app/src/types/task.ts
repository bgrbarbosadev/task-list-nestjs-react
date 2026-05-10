export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  createdAt: string;
  updatedAt: string;
};