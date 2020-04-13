import { Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  onLogin(): string {
    return 'This action returns all cats';
  }
}