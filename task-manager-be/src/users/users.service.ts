import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../common/dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../common/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: SignUpDto): Promise<User> {
    const user = this.userRepository.create({
      fullName: userDto.fullName,
      email: userDto.email,
      passwordHash: await bcrypt.hash(userDto.password, 10),
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
