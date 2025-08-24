import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { ValidatorService } from './validator.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../common/models/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { Task } from '../common/models/task.entity';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // 1 hour expiration
    }),
    TypeOrmModule.forFeature([User, Task]),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, ValidatorService, UsersService, JwtStrategy],
})
export class AuthModule {}
