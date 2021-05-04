import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MusicsModule } from './musics/musics.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import mongooseConfig from './config/mongoose.config';
import { AppController } from './app.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongooseConfig)],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongoose'),
      inject: [ConfigService],
    }),
    MusicsModule,
    AuthModule,
    UsersModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
