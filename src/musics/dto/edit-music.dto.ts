import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicDto } from './create-music.dto';

export class EditMusicDto extends PartialType(CreateMusicDto) {}
