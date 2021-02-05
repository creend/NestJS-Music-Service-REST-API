import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ValidUser } from 'src/interfaces/valid-user';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<ValidUser> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...results } = user;
      return results;
    }
    return null;
  }
}
