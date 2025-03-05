import { Body, Controller, Get, Post } from '@nestjs/common';

import { InterviewService } from './interview.service';
import { CreateInterviewDTO } from './interview.dto';

@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) { }

  @Get()
  findAllInterview() {
    return this.interviewService.findAll();
  }

  @Post()
  createInterviews(@Body() dto: CreateInterviewDTO) {
    return this.interviewService.createInterview(dto);
  }
}
