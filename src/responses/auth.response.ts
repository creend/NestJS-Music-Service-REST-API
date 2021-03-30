import * as mongoose from 'mongoose';

export type LoginResponse = {
  userId: mongoose.Schema.Types.ObjectId | null;
};

export type LogoutResponse = {
  logout: boolean;
};

export type IsLoggedResponse = {
  userId: mongoose.Schema.Types.ObjectId | null;
};
