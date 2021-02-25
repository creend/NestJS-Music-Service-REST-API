import { IsEnum, IsOptional, Length, MaxLength } from 'class-validator';
import { MusicGenre } from '../../schemas/music.schema';

export class EditMusicDto {
  @IsOptional()
  @Length(1, 255)
  title?: string;

  @IsOptional()
  @Length(1, 255)
  length?: number;

  @IsOptional()
  @Length(1, 255)
  author?: string;

  @IsOptional()
  @Length(1, 255)
  @IsEnum(MusicGenre)
  genre?: MusicGenre;
}
