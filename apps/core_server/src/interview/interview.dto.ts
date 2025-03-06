import { IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  interviewerId: string;

  @IsString()
  candidateId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  questions: string[];

  @IsString()
  timeDuration: string;
}
