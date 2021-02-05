import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return req.user;
  }

  @Post('/register')
  @HttpCode(201)
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.registerUser(user);
  }
}
