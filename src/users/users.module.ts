import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({ secret: process.env.TOKEN_SECRET }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
