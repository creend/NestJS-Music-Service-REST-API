import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @MinLength(3)
  @MaxLength(50)
  password: string;

  @MinLength(3)
  @MaxLength(50)
  retypedPassword: string;
}
