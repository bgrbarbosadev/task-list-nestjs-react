import { useState } from 'react';
import { Task, TaskFormValues } from './types/index';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';

const TASKS_PER_PAGE = 5;

const App = () => {
  const {
    tasks,
    loading,
    error,
    page,
    setPage,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggleStatus,
  } = useTasks();
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleCreateWrapper = async (values: TaskFormValues) => {
    await handleCreate(values);
    closeModal();
  };

  const handleUpdateWrapper = async (values: TaskFormValues) => {
    if (!selectedTask) {
      return;
    }
    await handleUpdate(selectedTask.id, values);
    closeModal();
  };

  const handleDeleteWrapper = async () => {
    if (!taskToDelete) {
      return;
    }
    await handleDelete(taskToDelete.id);
    setTaskToDelete(null);
  };

  const handleToggleStatusWrapper = async (task: Task) => {
    await handleToggleStatus(task);
  };

  const openCreateModal = () => {
    setSelectedTask(null);
    setModalMode('create');
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setModalMode('edit');
  };

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalMode(null);
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  const totalPages = Math.max(1, Math.ceil(tasks.length / TASKS_PER_PAGE));
  const currentTasks = tasks.slice((page - 1) * TASKS_PER_PAGE, page * TASKS_PER_PAGE);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="d-flex align-items-center gap-3">
        <label htmlFor="page-select" className="form-label mb-0 fw-semibold">
          Página:
        </label>
        <select
          id="page-select"
          className="form-select"
          style={{ width: 'auto', minWidth: '80px' }}
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <option key={pageNumber} value={pageNumber}>
              {pageNumber}
            </option>
          ))}
        </select>
        <span className="text-muted">
          de {totalPages}
        </span>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="mb-4 text-center">
            <h1 className="fw-bold">Task List</h1>
            <p className="text-muted">Veja todas as tarefas, edite, exclua e navegue por páginas de 5 itens.</p>
          </div>

          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <h2 className="h5 mb-1">Tarefas</h2>
              <p className="text-muted mb-0">Total de tarefas: {tasks.length}</p>
            </div>
            <div className="col-md-4 text-center">
              {renderPagination()}
            </div>
            <div className="col-md-4 text-end">
              <button className="btn btn-primary btn-lg" type="button" onClick={openCreateModal}>
                + Inserir tarefa
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {loading && <div className="alert alert-secondary">Carregando tarefas...</div>}

          {!loading && !error && (
            <div className="card shadow-sm">
              <div className="card-body">
                <TaskList tasks={currentTasks} onDelete={openDeleteModal} onToggleStatus={handleToggleStatusWrapper} onEdit={openEditModal} />
              </div>
            </div>
          )}
        </div>
      </div>

      {modalMode && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title mb-1">{modalMode === 'create' ? 'Nova tarefa' : 'Editar tarefa'}</h5>
                  <p className="text-muted mb-0">Preencha o formulário e salve para voltar à lista.</p>
                </div>
                <button type="button" className="btn-close" aria-label="Fechar" onClick={closeModal}></button>
              </div>
              <div className="modal-body pt-3">
                <TaskForm
                  initialValues={
                    selectedTask
                      ? { title: selectedTask.title, description: selectedTask.description }
                      : undefined
                  }
                  onSubmit={modalMode === 'create' ? handleCreateWrapper : handleUpdateWrapper}
                  submitLabel={modalMode === 'create' ? 'Criar tarefa' : 'Salvar alterações'}
                  onCancel={closeModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {taskToDelete && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0 rounded-4">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title mb-1">Confirmar exclusão</h5>
                  <p className="text-muted mb-0">Deseja realmente deletar esta tarefa?</p>
                </div>
                <button type="button" className="btn-close" aria-label="Fechar" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body pt-3">
                <p className="mb-4">
                  Título: <strong>{taskToDelete.title}</strong>
                </p>
                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={cancelDelete}>
                    Não
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleDeleteWrapper}>
                    Sim, deletar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
