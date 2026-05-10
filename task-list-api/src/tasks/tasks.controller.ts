import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto); // Agora assíncrono
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.tasksService.findAll(); // Agora assíncrono
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return await this.tasksService.findOne(id); // Agora assíncrono
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) { // Alterado para number
    return await this.tasksService.update(id, updateTaskDto); // Agora assíncrono
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) { // Alterado para number
    return await this.tasksService.remove(id); // Agora assíncrono
  }
}
