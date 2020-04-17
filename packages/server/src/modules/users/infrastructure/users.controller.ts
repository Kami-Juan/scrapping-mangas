import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getHello(): string {
    return "hello there!";
  }

  @Post()
  onLogin() {

  }
}
