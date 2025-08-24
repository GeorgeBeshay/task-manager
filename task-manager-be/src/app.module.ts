import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './common/models/user.entity';
import { Task } from './common/models/task.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CommonModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307, // updated port
      username: 'nestuser',
      password: 'nestpass',
      database: 'tasks_db',
      entities: [User, Task],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
