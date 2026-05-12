import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type ValidateUserDto, type CreateUserDto } from '../users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() createUser: CreateUserDto) {
    return this.authService.create(createUser);
  }

  @Post('/login')
  async login(@Body() validateUser: ValidateUserDto) {
    return this.authService.validate(validateUser);
  }
}
