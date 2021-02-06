import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { CheckIdGuard } from 'src/guards/check-id.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Get('/:id')
  @UseGuards(CheckIdGuard)
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
