import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../common/dto/sign-up.dto';
import bcrypt from 'bcrypt';
import { User } from '../common/models/user.interface';

@Injectable()
export class UsersService {
  // TODO: Replace with actual DB integration
  private users: User[] = [];

  async createUser(userDto: SignUpDto) {
    const user: User = {
      fullName: userDto.fullName,
      email: userDto.email,
      passwordHash: await bcrypt.hash(userDto.password, 10),
      createdAt: new Date(),
      id: this.users.length + 1,
    };
    this.users.push(user);

    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user: User) => user.email === email);
  }
}
