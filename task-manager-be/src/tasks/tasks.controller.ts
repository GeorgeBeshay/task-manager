import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}

@Controller('tasks')
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Req() req: RequestWithUser) {
    return this.tasksService.findAllTasksOfUser(req.user['id']);
  }

  @Post()
  async createTask(
    @Req() req: RequestWithUser,
    @Body() body: { title: string; description: string },
  ) {
    console.log(req.user);
    return this.tasksService.createTask(
      body.title,
      body.description,
      req.user['id'],
    );
  }

  @Get(':id')
  async getTask(@Req() req: RequestWithUser, @Param('id') id: number) {
    console.log(req.user);
    console.log(id);
    return this.tasksService.findTaskOfUser(id, req.user['id']);
  }

  @Put(':id')
  async updateTask(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body()
    updateData: { title?: string; description?: string; completed?: boolean },
  ) {
    return this.tasksService.updateTaskOfUser(id, updateData, req.user['id']);
  }

  @Delete(':id')
  async deleteTask(@Req() req: RequestWithUser, @Param('id') id: number) {
    const success = await this.tasksService.deleteTaskOfUser(
      id,
      req.user['id'],
    );
    return { success };
  }
}
