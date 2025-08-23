import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { ValidatorService } from './validator.service';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' }, // 1 hour expiration
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, ValidatorService, UsersService],
})
export class AuthModule {}
