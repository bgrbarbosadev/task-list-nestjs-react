# Task List NestJS + React

Projeto de lista de tarefas fullstack composto por uma API em NestJS com TypeORM e um frontend em React + Vite.

## Sobre o projeto

Esta aplicação permite criar, listar, consultar, atualizar e remover tarefas. A API é construída com NestJS e persiste os dados em um banco PostgreSQL. A interface web usa React, Vite, Bootstrap, Formik e Yup para uma experiência de cadastro de tarefas simples e responsiva.

## Estrutura do projeto

- `task-list-api/` - backend NestJS + TypeORM + PostgreSQL
- `task-list-app/` - frontend React + Vite + Bootstrap

## Tecnologias utilizadas

### Backend
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- class-validator / class-transformer
- Jest
- ESLint
- Prettier

### Frontend
- React
- TypeScript
- Vite
- Axios
- Bootstrap
- Formik
- Yup

## Configuração do ambiente

### Backend

1. Navegue até `task-list-api`
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Crie um arquivo `.env` na pasta `task-list-api` com as variáveis abaixo:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_banco
   ```
4. Inicie o backend:
   ```bash
   pnpm start:dev
   ```

### Frontend

1. Navegue até `task-list-app`
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o frontend:
   ```bash
   pnpm dev
   ```

> O frontend consome a API do backend. Garanta que o backend esteja em execução antes de usar a interface.

## Endpoints da API

A API expõe os seguintes endpoints em `/tasks`:

- `POST /tasks`
  - Cria uma nova tarefa
  - Corpo esperado:
    ```json
    {
      "title": "Título da tarefa",
      "description": "Descrição opcional",
      "status": "PENDING" // ou IN_PROGRESS, DONE
    }
    ```

- `GET /tasks`
  - Lista todas as tarefas

- `GET /tasks/:id`
  - Retorna a tarefa com o `id` informado

- `PUT /tasks/:id`
  - Atualiza a tarefa com o `id` informado
  - Corpo esperado similar ao `POST` acima

- `DELETE /tasks/:id`
  - Remove a tarefa com o `id` informado

## Modelo de dados de tarefa

Uma tarefa possui os campos:

- `id` (number)
- `title` (string)
- `description` (string, opcional)
- `status` (enum: `PENDING`, `IN_PROGRESS`, `DONE`)
- `createdAt` (data de criação)
- `updatedAt` (data de atualização)

## Scripts úteis

### Backend (`task-list-api`)
- `pnpm start` - iniciar a aplicação NestJS
- `pnpm start:dev` - iniciar em modo de desenvolvimento com reload
- `pnpm build` - compilar o backend
- `pnpm test` - executar testes
- `pnpm lint` - executar lint

### Frontend (`task-list-app`)
- `pnpm dev` - iniciar servidor de desenvolvimento
- `pnpm build` - gerar build de produção
- `pnpm preview` - pré-visualizar o build

## Observações

- A configuração do TypeORM em `task-list-api/src/app.module.ts` usa `synchronize: true`, recomendado apenas para desenvolvimento.
- Em produção, use migrações e defina `synchronize: false`.
