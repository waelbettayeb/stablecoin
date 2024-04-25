import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from './service'; // adjust the path as needed

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Get('me')
  async me() {
    return this.usersService.findOne(1);
  }
}
