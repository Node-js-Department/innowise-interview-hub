import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

import { EUserRole } from '@/common/models';

export class CreateUserDTO {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ enum: EUserRole })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  technology?: string;
}

export class UpdateUserDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  technology?: string;
}

export class FindUserByNameDTO {
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;
}
