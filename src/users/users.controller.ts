import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { CheckIdParamGuard } from 'src/guards/check-id-param.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Get('/:id')
  @UseGuards(CheckIdParamGuard)
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
