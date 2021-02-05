import { UserType } from 'src/schemas/user.schema';

export type ValidUser = {
  username: string;
  email: string;
  userType: UserType;
} | null;
