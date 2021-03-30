import { UserType } from 'src/enums/user-type';

export interface ValidUser {
  username: string;
  email: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
  id: string;
}
