import { Music } from '../interfaces/music';

export interface FindMusicsResponse {
  musics: Music[];
  count: number;
  requiredPages: number;
  page: number;
}

export interface FindMusicResponse {
  musics: Music[];
  count: number;
  requiredPages: number;
  page: number;
}

export type createMusicResponse = Music;
export type edutMusicResponse = Music;
