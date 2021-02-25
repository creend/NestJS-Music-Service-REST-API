import { MusicGenre } from '../schemas/music.schema';
import * as mongoose from 'mongoose';
export interface MusicInterface {
  title: string;
  length: number;
  author: string;
  genre: MusicGenre;
  createdAt: string;
  updatedAt: string;
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
}
