import { MusicGenre } from 'src/schemas/music.schema';

export class CreateMusicDto {
  title: string;
  length: number;
  author: string;
  genre: MusicGenre;
}
