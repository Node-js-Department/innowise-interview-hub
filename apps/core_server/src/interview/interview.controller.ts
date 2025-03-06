import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './interview.dto';

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
