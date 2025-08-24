import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SignInResponse } from '../common/models/signin-response.interface';
import { User } from '../common/models/user.entity';
import { SignUpDto } from '../common/dto/sign-up.dto';
import { ValidatorService } from './validator.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly validatorService: ValidatorService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(@Body() signUpDto: SignUpDto): Promise<SignInResponse> {
    const validationResult: { isValid: boolean; errors?: string[] } =
      await this.validatorService.validateSignUp(signUpDto);

    if (!validationResult.isValid && validationResult.errors) {
      return {
        message: 'Signup failed',
        errors: validationResult.errors,
        user: null,
        access_token: null,
      };
    }

    const user: User = await this.usersService.createUser(signUpDto);
    const payload = { sub: user.id, email: user.email };

    return {
      message: 'Signup successful!',
      errors: null,
      user: {
        fullName: signUpDto.fullName,
        email: signUpDto.email,
        id: user.id ?? -1,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.passwordHash) {
      return {
        message: 'Sign in failed.',
        access_token: null,
        user: null,
        errors: [
          !user
            ? 'User not found'
            : 'User has no password hash. Something is wrong...',
        ],
      };
    }

    const match = await bcrypt.compare(pass, user.passwordHash);
    if (match) {
      const payload = { sub: user.id, email: user.email };
      return {
        message: 'SignIn successfully',
        access_token: this.jwtService.sign(payload),
        user: { id: user.id, email: user.email, fullName: user.fullName },
        errors: null,
      };
    } else {
      return {
        message: 'Sign in failed.',
        access_token: null,
        user: null,
        errors: ['Incorrect password'],
      };
    }
  }
}
