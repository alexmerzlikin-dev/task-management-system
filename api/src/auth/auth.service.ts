import { Injectable } from '@nestjs/common';
import { CreateUserDto, ValidateUserDto } from '../users/user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private saltRounds: number;

  constructor(private readonly userService: UsersService) {
    this.saltRounds = 10;
  }

  async create(createUser: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUser.password,
      this.saltRounds,
    );

    let data = {
      ...createUser,
      createdAt: new Date(),
      password: hashedPassword,
    };

    const user = await this.userService.create(data);

    return { message: `User ${user.email} created successfully` };
  }

  async validate(validateUser: ValidateUserDto) {
    return this.userService.validate(validateUser);
    
  }
}
