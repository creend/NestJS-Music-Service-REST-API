import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponse, RegisterResponse } from '../responses/users.response';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserObj } from '../decorators/user-object.decorator';
import { LoginPayload } from '../interfaces/login-payload';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsersService) private usersService: UsersService,
    @Inject(AuthService) private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@UserObj() user: LoginPayload): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: CreateUserDto): Promise<RegisterResponse> {
    return this.usersService.registerUser(user);
  }
}
