import { MusicInterface } from '../interfaces/music';

export type FindMusicsResponse = {
  musics: MusicInterface[];
  count: number;
  requiredPages: number;
  page: number;
};

export type FindMusicResponse = MusicInterface;
export type CreateMusicResponse = MusicInterface;
export type EditMusicResponse = MusicInterface;
export type DeleteMusicResponse = MusicInterface;
