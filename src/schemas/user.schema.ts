import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserType } from '../enums/user-type';

const UserTypes: string[] = [
  UserType.Admin,
  UserType.Moderator,
  UserType.Normal,
];

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ maxlength: 50, minlength: 3, required: true, unique: true })
  username: string;

  @Prop({ maxlength: 100, minlength: 2, required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: UserTypes })
  userType: UserType;

  @Prop({ default: false })
  verified?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
