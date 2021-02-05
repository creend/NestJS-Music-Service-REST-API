import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      useFindAndModify: false,
    }),
    MusicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
