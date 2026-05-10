import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'; // Importações do TypeORM para definir a entidade

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity() // Decorator que marca a classe como uma entidade do banco de dados
export class Task {
  @PrimaryGeneratedColumn() // Define a coluna id como chave primária auto-incrementada
  id!: number;

  @Column({ length: 100 }) // Define a coluna title como string com limite de 100 caracteres
  title!: string;

  @Column({ length: 500, nullable: true }) // Define a coluna description como string opcional com limite de 500 caracteres
  description?: string;

  @Column({ // Define a coluna status como enum
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING, // Valor padrão
  })
  status!: TaskStatus;

  @CreateDateColumn() // Coluna para data de criação, preenchida automaticamente
  createdAt!: Date;

  @UpdateDateColumn() // Coluna para data de atualização, preenchida automaticamente
  updatedAt!: Date;
}
