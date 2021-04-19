import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MusicGenre } from 'src/enums/music-genre';
import { CreateMusicDto } from './create-music.dto';

export class EditMusicDto extends PartialType(CreateMusicDto) {}
