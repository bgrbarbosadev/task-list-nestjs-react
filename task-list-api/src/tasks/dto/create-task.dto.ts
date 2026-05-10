import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {

  @IsNotEmpty({ message: 'O título é obrigatório.' })
  @IsString()
  @MaxLength(100)
  @MinLength(3, { message: 'O título deve ter pelo menos 3 caracteres.' })
  title!: string;
 
  @IsString()
  @MaxLength(500)
  @MinLength(3, { message: 'A descrição deve ter pelo menos 3 caracteres.' })
  description?: string;
 
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status inválido.' })
  status?: TaskStatus;
}
