import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckIdParamGuard } from '../guards/check-id-param.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { CheckIdUserGuard } from '../guards/check-id-user.guard';
import { Music } from '../schemas/music.schema';
import { User } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { UserObj } from '../decorators/user-object.decorator';
import { LoginPayload } from '../interfaces/login-payload';
import {
  DeleteUserResponse,
  EditUserResponse,
} from '../responses/users.response';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserBy } from 'src/enums/find-user-by';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id')
  @UseGuards(CheckIdParamGuard)
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return this.usersService.findOne(id, FindUserBy.ID);
  }

  @Get('/username/:username')
  @HttpCode(HttpStatus.OK)
  async findByUsername(@Param('username') username: string) {
    return this.usersService.findOne(username, FindUserBy.USERNAME);
  }

  @Get('/verify/:token')
  @HttpCode(HttpStatus.OK)
  async verifyUser(@Param('token') token: string): Promise<string> {
    return await this.usersService.verifyUser(token);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard, CheckIdUserGuard)
  async deleteAccount(
    @Param('id') id: string,
    @UserObj() user: LoginPayload,
    @Body() userDto: DeleteUserDto,
  ): Promise<DeleteUserResponse> {
    return this.usersService.deleteAccount(userDto, id, user.id);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'), CheckIdParamGuard, CheckIdUserGuard)
  async editAccount(
    @Param('id') id: string,
    @UserObj() user: LoginPayload,
    @Body() userDto: EditUserDto,
  ): Promise<EditUserResponse> {
    return this.usersService.editAccount(id, user.id, userDto);
  }
}
