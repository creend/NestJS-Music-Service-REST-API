import { ValidUser } from '../interfaces/valid-user';

export type LoginResponse = {
  access_token: string;
};

export type FindUserResponse = ValidUser;
export type RegisterResponse = ValidUser;
export type EditUserResponse = ValidUser;
export type DeleteUserResponse = ValidUser;
