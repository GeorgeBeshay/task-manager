import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from '../common/dto/update-task.dto';
import { Task } from '../common/models/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async createTask(
    title: string,
    description: string,
    userId: number,
  ): Promise<Task> {
    const task = this.taskRepo.create({
      title,
      description,
      completed: false,
      userId,
    });
    return this.taskRepo.save(task);
  }

  async findAllTasksOfUser(userId: number): Promise<Task[]> {
    return this.taskRepo.find({ where: { userId } });
  }

  async findTaskOfUser(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException(`Task ${id} not found`);
    return task;
  }

  async updateTaskOfUser(
    id: number,
    dto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    const task = await this.findTaskOfUser(id, userId);
    Object.assign(task, dto);
    return this.taskRepo.save(task);
  }

  async deleteTaskOfUser(id: number, userId: number): Promise<void> {
    const task = await this.findTaskOfUser(id, userId);
    await this.taskRepo.remove(task);
  }
}
