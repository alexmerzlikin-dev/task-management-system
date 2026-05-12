import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { type UpdateTaskDto, type CreateTaskDto } from './task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const userId = await req.user.sub;
    const data = await { ...createTaskDto, user: { id: Number(userId) } };
    
    await this.tasksService.createTask(data);

    return { message: `Task was created for user with ID ${userId}` };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserTasks(@Request() req) {
    const userId = await req.user.sub;
    const tasks = await this.tasksService.getUserTasks(Number(userId));
    return tasks;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateTaskStatus(@Request() req, @Body() updateTaskDto: UpdateTaskDto) {
    const taskId = await req.params.id;
    const data = await { ...updateTaskDto, id: Number(taskId) };
    return await this.tasksService.updateTaskStatus(data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTask(@Request() req) {
    const taskId = await req.params.id;
    const userId = await req.user.sub;
    return await this.tasksService.deleteTask(Number(taskId), Number(userId));
  }
}
