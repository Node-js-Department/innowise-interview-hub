import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInterviewDTO {
    @IsOptional()
    @IsNumber()
    score?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    interviewDate?: Date;

    @IsOptional()
    @IsNumber()
    followUpCount?: number;

    @IsOptional()
    @IsNumber()
    questionCount?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    time?: Date;

    @IsOptional()
    @IsString()
    level?: string;
}

export class UpdateInterviewDTO {

}
