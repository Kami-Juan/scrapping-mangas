import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserController } from '../useCases/createUser/CreateUserController';

import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private createUserController: CreateUserController) {}

  @Get()
  getHello(): string {
    return "hello there!";
  }

  @Post("signup")
  onSignup(@Req() request: Request, @Res() res: Response) {
    this.createUserController.execute(request, res);
  }
}
