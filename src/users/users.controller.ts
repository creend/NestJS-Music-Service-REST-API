import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { CheckIdParamGuard } from 'src/guards/check-id-param.guard';
import { Music } from 'src/schemas/music.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Get('/:id')
  @UseGuards(CheckIdParamGuard)
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
  @Get('/musics/:id')
  @UseGuards(CheckIdParamGuard)
  async findUsersMusics(@Param('id') id: string): Promise<Music[]> {
    return this.usersService.findUsersMusics(id);
  }
}
