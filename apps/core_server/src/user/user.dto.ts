import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'Semen', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ivan@example.com', description: 'Email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Candidate | Interviewer', description: 'Role пользователя', default: 'Candidate' })
@IsString()
@IsOptional()
@Transform(({ value }) => value ?? 'Candidate')
role?: string;

  @ApiProperty({ example: 'JavaScript', description: 'technology', required: false })
  @IsString()
  @IsOptional()
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
