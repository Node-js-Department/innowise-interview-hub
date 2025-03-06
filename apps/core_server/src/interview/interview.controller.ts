import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateInterviewDto } from './interview.dto';
import { InterviewService } from './interview.service';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) { }

  @Get()
  findAllInterview() {
    return this.interviewService.findAll();
  }

  @Post('create')
  async startInterview(@Body() createInterviewDto: CreateInterviewDto) {
    return await this.interviewService.createInterview(
      createInterviewDto.interviewerId,
      createInterviewDto.candidateId,
      createInterviewDto.questions,
      createInterviewDto.timeDuration
    );
  }

}
