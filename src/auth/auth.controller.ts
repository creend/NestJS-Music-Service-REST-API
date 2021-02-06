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
import { Login } from 'src/responses/login.response';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(AuthService) private authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any): Promise<Login> {
    return this.authService.login(req.user);
  }

  @Post('/register')
  @HttpCode(201)
  async register(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.registerUser(user);
  }
}
