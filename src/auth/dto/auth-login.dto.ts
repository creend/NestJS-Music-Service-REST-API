import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsEmail({}, { message: 'Email is not email' })
  @MaxLength(100, { message: 'Email is too long' })
  email: string;

  @MinLength(3, { message: 'Password has minimum length of 3' })
  @MaxLength(50, { message: 'Password has minimum length of 50' })
  password: string;
}
