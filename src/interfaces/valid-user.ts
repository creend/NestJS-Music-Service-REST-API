import { UserType } from 'src/schemas/user.schema';

export interface ValidUser {
  username: string;
  email: string;
  userType: UserType;
}
