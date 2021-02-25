import { MaxLength, MinLength } from 'class-validator';

export class DeleteUserDto {
  @MinLength(3)
  @MaxLength(50)
  password: string;

  @MinLength(3)
  @MaxLength(50)
  retypedPassword: string;
}
