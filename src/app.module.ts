import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MusicsModule } from './musics/musics.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      useFindAndModify: false,
    }),
    MusicsModule,
    AuthModule,
    UsersModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
