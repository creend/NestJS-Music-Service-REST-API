import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserType {
  Admin = 'admin',
  Moderator = 'moderator',
  Normal = 'normal',
}

const UserTypes: string[] = [
  UserType.Admin,
  UserType.Moderator,
  UserType.Normal,
];

@Schema()
export class User extends Document {
  @Prop({ maxlength: 50, minlength: 3, required: true, unique: true })
  username: string;

  @Prop({ maxlength: 100, minlength: 2, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserTypes })
  userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
