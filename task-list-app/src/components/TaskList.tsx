import { Task } from '../types/index';

type TaskListProps = {
  tasks: Task[];
  onDelete: (task: Task) => void;
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
};

export const TaskList = ({ tasks, onDelete, onToggleStatus, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return <div className="alert alert-info">Nenhuma tarefa cadastrada ainda.</div>;
  }

  return (
    <div className="list-group">
      {tasks.map((task) => (
        <div key={task.id} className="list-group-item list-group-item-action mb-2 shadow-sm">
          <div className="d-flex justify-content-between align-items-start gap-3 flex-column flex-md-row">
            <div>
              <h3 className="h6 mb-1">{task.title}</h3>
              <p className="mb-1 text-muted">{task.description}</p>
              <span className={`badge ${task.status === 'DONE' ? 'bg-success' : 'bg-warning text-dark'}`}>
                {task.status}
              </span>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => onEdit(task)}>
                Editar
              </button>
              <button type="button" className="btn btn-outline-success btn-sm" onClick={() => onToggleStatus(task)}>
                {task.status === 'DONE' ? 'Reabrir' : 'Concluir'}
              </button>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => onDelete(task)}>
                Excluir
              </button>
            </div>
          </div>
          <small className="text-muted">Criada em: {new Date(task.createdAt).toLocaleString('pt-BR')}</small>
        </div>
      ))}
    </div>
  );
};
