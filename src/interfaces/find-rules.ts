import * as mongoose from 'mongoose';

export interface FindRules {
  title: RegExp;
  userId?: mongoose.Schema.Types.ObjectId;
}
