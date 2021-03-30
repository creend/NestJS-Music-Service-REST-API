import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterResponse } from '../responses/users.response';
import { User } from '../schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserObj } from '../decorators/user-object.decorator';
import { LoginPayload } from '../interfaces/login-payload';
import { Request, Response } from 'express';
import {
  IsLoggedResponse,
  LoginResponse,
  LogoutResponse,
} from 'src/responses/auth.response';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(
    @Body() user: AuthLoginDto,
    @Res() response: Response,
  ): Promise<LoginResponse> {
    try {
      return this.authService.login(user, response);
    } catch (err) {
      return {
        userId: null,
      };
    }
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async logout(@Res() response: Response): Promise<LogoutResponse> {
    return await this.authService.logout(response);
  }

  @Get('/logged')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  isLogged(@Req() request): IsLoggedResponse {
    return this.authService.isLogged(request?.cookies?.jwt);
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: CreateUserDto): Promise<RegisterResponse> {
    return this.usersService.registerUser(user);
  }
}
