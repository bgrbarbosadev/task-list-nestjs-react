import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required('O título é obrigatório.')
    .min(3, 'O título deve ter pelo menos 3 caracteres.')
    .max(100, 'O título pode ter no máximo 100 caracteres.'),
  description: yup
    .string()
    .required('A descrição é obrigatória.')
    .min(3, 'A descrição deve ter pelo menos 3 caracteres.')
    .max(500, 'A descrição pode ter no máximo 500 caracteres.'),
});