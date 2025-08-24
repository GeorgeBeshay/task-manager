import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../common/models/task.entity';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService],
  imports: [CommonModule, TypeOrmModule.forFeature([Task])],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
