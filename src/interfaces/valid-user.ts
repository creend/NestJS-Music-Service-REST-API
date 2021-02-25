import { UserType } from '../schemas/user.schema';

export interface ValidUser {
  username: string;
  email: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
  id: string;
}
