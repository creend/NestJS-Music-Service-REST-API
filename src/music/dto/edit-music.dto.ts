import { IsEnum, MaxLength, MinLength } from 'class-validator';
import { MusicGenre } from 'src/schemas/music.schema';

export class EditMusicDto {
  @MaxLength(255)
  @MinLength(2)
  title?: string;

  length?: number;

  @MaxLength(255)
  @MinLength(2)
  author?: string;

  @IsEnum(MusicGenre)
  genre?: MusicGenre;
}
