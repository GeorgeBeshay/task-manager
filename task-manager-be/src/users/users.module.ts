import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/models/user.entity';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
