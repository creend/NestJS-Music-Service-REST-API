import {
  CacheInterceptor,
  CacheModule,
  forwardRef,
  Module,
} from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { Music, MusicSchema } from '../schemas/music.schema';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
    forwardRef(() => MailModule),
    forwardRef(() => UsersModule),
    // CacheModule.register({ store: redisStore }),
  ],
  controllers: [MusicsController],
  providers: [
    MusicsService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class MusicsModule {}
