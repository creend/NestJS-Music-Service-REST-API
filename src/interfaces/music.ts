import * as mongoose from 'mongoose';
import { MusicGenre } from 'src/enums/music-genre';
export interface MusicInterface {
  title: string;
  length: number;
  author: string;
  username: string;
  genre: MusicGenre;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}
