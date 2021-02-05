import { MusicGenre } from 'src/schemas/music.schema';

export class EditMusicDto {
  title?: string;
  length?: number;
  author?: string;
  genre?: MusicGenre;
}
