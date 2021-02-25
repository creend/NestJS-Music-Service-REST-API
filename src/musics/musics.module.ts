import { forwardRef, Module } from '@nestjs/common';
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
  ],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
