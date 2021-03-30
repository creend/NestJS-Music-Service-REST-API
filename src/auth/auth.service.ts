import * as bcrypt from 'bcryptjs';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../interfaces/login-payload';
import { Response } from 'express';
import { IsLoggedResponse, LoginResponse } from 'src/responses/auth.response';
import { AuthLoginDto } from './dto/auth-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<LoginPayload> {
    const user = await this.usersService.findByEmail(email);
    if (
      user &&
      (await bcrypt.compare(password, user.passwordHash)) &&
      user.verified
    ) {
      return {
        username: user.username,
        id: user._id,
      };
    }
    return null;
  }

  async login(userDto: AuthLoginDto, response: Response): Promise<any> {
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      throw new UnauthorizedException('Password or email incorrect');
    }
    if (!user.verified) {
      throw new ForbiddenException('Your account is not verified!readonly ');
    }
    if (!(await bcrypt.compare(userDto.password, user.passwordHash))) {
      throw new UnauthorizedException('Password or email incorrect');
    }
    const accessToken = this.jwtService.sign(
      {
        id: user._id,
        username: user.username,
      },
      { expiresIn: 60 * 60 * 24 },
    );

    return response
      .cookie('jwt', accessToken, {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .send({
        userId: user._id,
      });
  }

  isLogged(token: string): IsLoggedResponse {
    const user = this.jwtService.verify(token) ?? null;
    return {
      userId: user?.id,
    };
  }

  async logout(response: Response): Promise<any> {
    response
      .clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      })
      .send({
        logout: true,
      });
  }
}
