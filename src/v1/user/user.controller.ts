import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './application/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.register(username, password);
  }
}
