import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class EditUserDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  email?: string;

  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  password?: string;

  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  retypedPassword?: string;
}
