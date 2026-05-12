import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  createTask(createTaskDto: CreateTaskDto) {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  getUserTasks(userId: number) {
    return this.tasksRepository.find({ where: { user: { id: userId } } });
  }

  async updateTaskStatus(updateTaskDto: UpdateTaskDto) {
    const { id, ...updateData } = updateTaskDto;
    await this.tasksRepository.update(id, updateData);
    return this.tasksRepository.findOne({ where: { id } });
  }

  async deleteTask(taskId: number) {
    await this.tasksRepository.delete(taskId);
    return { message: `Task with ID ${taskId} was deleted` };
  }
} 
