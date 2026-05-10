import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Importado para injeção de repositório
import { Repository } from 'typeorm'; // Importado para usar métodos do repositório
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) // Injeta o repositório da entidade Task
    private readonly taskRepository: Repository<Task>, // Repositório para operações no banco
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto); // Cria uma nova instância da entidade
    return await this.taskRepository.save(task); // Salva no banco e retorna
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find(); // Busca todas as tarefas no banco
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id }); // Busca por id
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`); // Lança erro se não encontrar
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id); // Verifica se a tarefa existe
    Object.assign(task, updateTaskDto); // Atualiza os campos
    return await this.taskRepository.save(task); // Salva as mudanças
  }

  async remove(id: number): Promise<void> {
    const task = await this.findOne(id); // Verifica se a tarefa existe
    await this.taskRepository.remove(task); // Remove do banco
  }
}
