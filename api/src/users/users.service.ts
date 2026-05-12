import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto, ValidateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  create(createUser: CreateUserDto) {
    const user = this.usersRepository.create(createUser);
    return this.usersRepository.save(user);
  }

  async validate(validateUser: ValidateUserDto) {
    const user = await this.usersRepository.findOneBy({
      email: validateUser.email,
    });
    const isPasswordValid =
      user && (await bcrypt.compare(validateUser.password, user.password));

    if (isPasswordValid) {
      const payload = { email: user.email, sub: user.id };

      const token = this.jwtService.sign(payload);

      return { message: 'Authentication successful', token };
    } else {
      throw new UnauthorizedException();
    }
  }
}
