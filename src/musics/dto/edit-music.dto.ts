import { IsDefined, IsEnum, MaxLength } from 'class-validator';
import { MusicGenre } from 'src/schemas/music.schema';

export class EditMusicDto {
  @MaxLength(255)
  title?: string;

  length?: number;

  @MaxLength(255)
  author?: string;

  @IsEnum(MusicGenre)
  genre?: MusicGenre;
}
