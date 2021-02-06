import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ValidUser } from 'src/interfaces/valid-user';
import { JwtService } from '@nestjs/jwt';
import { Login } from 'src/responses/login.response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<ValidUser> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...results } = user;
      return results;
    }
    return null;
  }

  async login(user: any): Promise<Login> {
    const payload = { username: user._doc.username, id: user._doc._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
