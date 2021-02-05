import { MusicGenre } from 'src/schemas/music.schema';

export interface Music {
  title: string;
  length: number;
  author: string;
  genre: MusicGenre;
}

export interface FindMusicsResponse {
  musics: Music[];
  count: number;
  requiredPages: number;
  page: number;
}
