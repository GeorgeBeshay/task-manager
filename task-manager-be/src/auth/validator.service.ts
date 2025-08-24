import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../common/dto/sign-up.dto';
import { signupSchema } from './signupSchema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ValidatorService {
  constructor(private readonly usersService: UsersService) {}

  validateSignUp(data: SignUpDto): { isValid: boolean; errors?: string[] } {
    if (this.usersService.findByEmail(data.email)) {
      return { isValid: false, errors: ['Email already in use'] };
    }

    const { error } = signupSchema.validate(data, { abortEarly: false });

    if (error) {
      const messages = error.details.map((d) => d.message).join(', ');
      return { isValid: false, errors: [messages] };
    }
    return { isValid: true };
  }
}
