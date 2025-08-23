import { Body, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { SignInResponse } from '../common/models/signin-response.interface';
import { User } from '../common/models/user.interface';
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
      this.validatorService.validateSignUp(signUpDto);

    if (!validationResult.isValid && validationResult.errors) {
      return {
        message: 'Signup failed',
        errors: validationResult.errors,
        user: null,
        access_token: null,
      };
    }

    const user: User = await this.usersService.createUser(signUpDto);
    const payload = { sub: user.id, username: user.email };

    return {
      message: 'Signup successful!',
      errors: null,
      user: {
        fullName: signUpDto.fullName,
        email: signUpDto.email,
        id: user.id ?? -1,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, pass: string): Promise<SignInResponse> {
    const user = this.usersService.findByEmail(email);
    if (!user || !user.passwordHash) {
      return {
        message: 'Sign in failed.',
        access_token: null,
        user: null,
        errors: [
          !user?.passwordHash
            ? 'User has no password hash. Something is wrong...'
            : 'User not found',
        ],
      };
    }

    const match = await bcrypt.compare(pass, user.passwordHash);
    if (match) {
      const payload = { sub: user.id, username: user.email };
      return {
        message: 'SignIn successfully',
        access_token: await this.jwtService.signAsync(payload),
        user: { id: user.id ?? -1, email: user.email, fullName: user.fullName },
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
