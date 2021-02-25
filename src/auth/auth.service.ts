import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from '../responses/users.response';
import { LoginPayload } from '../interfaces/login-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

  login(user: LoginPayload): LoginResponse {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
