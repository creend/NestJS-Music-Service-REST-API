import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginPayload } from '../interfaces/login-payload';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { jwtCookieExtrator } from '../utils/jwt-cookie-extractor';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtCookieExtrator]),
      secretOrKey: configService.get('jwt.secretToken'),
    });
  }

  async validate(
    payload: LoginPayload,
    done: (err, user) => void,
  ): Promise<any> {
    if (!payload || !payload.id || !payload.username) {
      return done(new UnauthorizedException(), false);
    }
    const user = await this.userModel.findById(payload.id);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    return done(null, user);
  }
}
