import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { TaskFormValues, defaultTaskFormValues } from '../types/index';
import { taskSchema } from '../validations/taskSchema';

type TaskFormProps = {
  initialValues?: TaskFormValues;
  submitLabel?: string;
  onSubmit: (values: TaskFormValues) => Promise<void>;
  onCancel?: () => void;
};

export const TaskForm = ({
  initialValues = defaultTaskFormValues,
  submitLabel = 'Adicionar tarefa',
  onSubmit,
  onCancel,
}: TaskFormProps) => {
  const handleSubmit = async (values: TaskFormValues, helpers: FormikHelpers<TaskFormValues>) => {
    try {
      await onSubmit(values);
      helpers.resetForm();
    } catch (error) {
      helpers.setStatus('Ocorreu um erro ao salvar a tarefa.');
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ isSubmitting, status }) => (
        <Form>
          {status && <div className="alert alert-danger">{status}</div>}

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Título
            </label>
            <Field name="title" id="title" className="form-control" />
            <div className="form-text text-danger">
              <ErrorMessage name="title" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Descrição
            </label>
            <Field as="textarea" name="description" id="description" rows={4} className="form-control" />
            <div className="form-text text-danger">
              <ErrorMessage name="description" />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            {onCancel && (
              <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : submitLabel}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
