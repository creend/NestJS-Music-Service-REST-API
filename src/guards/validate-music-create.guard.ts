import {
  ExecutionContext,
  Injectable,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';
import { isMongoId, validate, validateOrReject } from 'class-validator';
import { Request } from 'express';
import { CreateMusicDto } from 'src/musics/dto/create-music.dto';

@Injectable()
export class ValidateMusicCreateGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const music = new CreateMusicDto();
      const { body }: { body: CreateMusicDto } = request;
      music.author = body.author;
      music.genre = body.genre;
      music.length = body.length;
      music.title = body.title;
      console.log(request);
      await validateOrReject(music);
      return true;
    } catch (err) {
      throw new BadRequestException('Error data');
    }
  }
}
