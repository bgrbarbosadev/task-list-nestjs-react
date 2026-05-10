import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importado para registrar a entidade Task
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity'; // Importada a entidade Task

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Registra a entidade Task para injeção de repositório
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
