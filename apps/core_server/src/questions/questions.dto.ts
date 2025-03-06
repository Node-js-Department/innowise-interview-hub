import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export interface Followup {
    id: string;
    tags: string[];
    title: string;
    weight: number;
  }

  export interface Question {
    id: string;
    tags: string[];
    title: string;
    weight: number;
    followUpQuestions: Followup[];
  }

  export interface Theme {
    id: string;
    title: string;
    questions: Map<string, Question>;
  }

  export interface Topic {
    id: string;
    title: string;
    themes: Map<string, Theme>;
  }

  export interface Domain {
    id: string;
    title: string;
    topics: Map<string, Topic>;
  }

export class UpdatedAnswerDTO {
  @ApiProperty({type: String})
  @IsString()
  interviewId: string;

  @ApiProperty({type: String})
  @IsString()
  questionId: string;

  @ApiProperty({type: String})
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({type: Number})
  @IsNumber()
  @IsOptional()
  rate?: number;
}


