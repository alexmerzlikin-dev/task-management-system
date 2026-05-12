import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';
import { type CreateTaskDto } from './task.dto';

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
}

