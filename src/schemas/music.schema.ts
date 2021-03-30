import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { MusicGenre } from 'src/enums/music-genre';

const MusicGrenres = [
  MusicGenre.HipHop,
  MusicGenre.Pop,
  MusicGenre.Country,
  MusicGenre.Reagge,
];

@Schema({ timestamps: true })
export class Music extends Document {
  @Prop({ maxlength: 255, minlength: 2, required: true })
  title: string;

  @Prop({ required: true })
  length: number;

  @Prop({ maxlength: 255, minlength: 2 })
  author: string;

  @Prop({ required: true, enum: MusicGrenres })
  genre: MusicGenre;

  @Prop({ required: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ maxlength: 50, minlength: 3, required: true })
  username: string;

  @Prop({ required: true })
  musicFileName: string;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
