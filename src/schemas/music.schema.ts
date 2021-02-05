import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum MusicGenre {
  HipHop = 'HipHop',
  Pop = 'Pop',
  Country = 'Counry',
  Reagge = 'Reagge',
}

const MusicGrenres: string[] = [
  MusicGenre.HipHop,
  MusicGenre.Pop,
  MusicGenre.Country,
  MusicGenre.Reagge,
];

@Schema()
export class Music extends Document {
  @Prop({ maxlength: 255, minlength: 2, required: true })
  title: string;

  @Prop({ required: true })
  length: number;

  @Prop({ maxlength: 255, minlength: 2 })
  author: string;

  @Prop({ required: true, enum: MusicGrenres })
  genre: MusicGenre;
}

export const MusicSchema = SchemaFactory.createForClass(Music);
