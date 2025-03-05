import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  technology?: string;
}

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  technology?: string;
}
