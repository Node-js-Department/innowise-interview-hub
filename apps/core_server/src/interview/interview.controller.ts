import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) { }

  @Get()
  @ApiOperation({ summary: 'Get all interviews' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all interviews',
    content: {
      'application/json': {
        example: [
          {
            id: 'id: interview_1741329321841',
            createdAt: '2025-03-07T08:30:00Z',
            duration: 30,
          },
        ],
      },
    },
  })
  findAllInterview() {
    return this.interviewService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new interview' })
  @ApiBody({
    description: 'Provide interviewerId, candidateId, list of questions, and duration',
    examples: {
      example1: {
        summary: 'Interview creation request',
        value: {
          interviewerId: '8cc5665c-f2b7-40e2-826c-b4d6090f9732',
          candidateId: '6553595e-fec4-40d1-aa2e-2f78610d03c4',
          questions: [
            '848a46ef-3d0a-4dba-adcb-1891b33b0350',
            'd9ca23f9-9c08-4078-a6c6-e922288a7a2f',
            'e52eb952-2b02-4924-9c69-447aabc0fc10',
            'af4c4a97-fbd3-468e-9c29-b396d1abc15a',
            '2cb976f4-390d-4506-a96d-2d7fa0217ee4',
          ],
          timeDuration: '60',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Interview created successfully',
    content: {
      'application/json': {
        example: 'interview_1741329321841',
      },
    },
  })
  async startInterview(@Body() createInterviewDto: CreateInterviewDto) {
    return await this.interviewService.createInterview(
      createInterviewDto.interviewerId,
      createInterviewDto.candidateId,
      createInterviewDto.questions,
      createInterviewDto.timeDuration
    );
  }

  @Post('questions')
  @ApiOperation({ summary: 'Get all questions for a given interview' })
  @ApiBody({
    description: 'Provide interview ID to fetch its questions',
    examples: {
      example1: {
        summary: 'Fetch questions for interview',
        value: {
          interviewId: 'interview_1741329321841',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'List of questions for the interview',
    content: {
      'application/json': {
        example: {
          interviewId: 'interview123',
          questions: [
            {
              id: 'e52eb952-2b02-4924-9c69-447aabc0fc10',
              title: 'What is the Virtual DOM and how does it work?',
              weight: 7,
              followupQuestions: [
                {
                  id: '08aa6a93-b40c-482e-891b-57380a9c7d5b',
                  title: 'Why is the Virtual DOM considered more efficient for rendering?',
                  weight: 7,
                },
                {
                  id: 'baf2116b-e541-4f25-9154-94a6f6720ac1',
                  title: 'What is the difference between the Virtual DOM and the Real DOM?',
                  weight: 8,
                },
              ],
            },
            {
              id: 'd9ca23f9-9c08-4078-a6c6-e922288a7a2f',
              title: 'What are different caching strategies and when would you use each?',
              weight: 7,
              followupQuestions: [
                {
                  id: '7a335f51-a500-48d6-9d06-c4bcca74af4e',
                  title: 'How would you implement a multi-level caching strategy?',
                  weight: 8,
                },
                {
                  id: '8cfd5750-b4f2-47d9-8680-11e985fbda19',
                  title: 'How do you handle cache invalidation in a distributed system?',
                  weight: 8,
                },
              ],
            },
            {
              id: '2cb976f4-390d-4506-a96d-2d7fa0217ee4',
              title: 'What are React Hooks and why were they introduced?',
              weight: 8,
              followupQuestions: [
                {
                  id: '43c2f1f6-492f-4dd3-835c-26592dd2b349',
                  title: 'How would you implement a custom Hook and in what scenarios would you use one?',
                  weight: 8,
                },
                {
                  id: 'd23ef8ee-ea25-4290-b3d8-cc8c45ebe83d',
                  title: "Explain the rules of Hooks and why they're important.",
                  weight: 9,
                },
              ],
            },
            {
              id: 'af4c4a97-fbd3-468e-9c29-b396d1abc15a',
              title: 'Explain the reconciliation process in React.',
              weight: 8,
              followupQuestions: [
                {
                  id: 'c0823338-aa1e-4499-ae5f-176b085aeb81',
                  title: 'What are keys in React and why are they important for reconciliation?',
                  weight: 9,
                },
              ],
            },
            {
              id: '848a46ef-3d0a-4dba-adcb-1891b33b0350',
              title: 'How do CDNs work and when should you use them?',
              weight: 9,
              followupQuestions: [
                {
                  id: '1e5ba082-b200-4b34-8ec8-599116c49e73',
                  title: 'How do you handle dynamic content with CDNs?',
                  weight: 7,
                },
                {
                  id: '5fab3041-6bb3-4a3c-a09e-c779b5ec5dea',
                  title: 'What are edge computing capabilities in modern CDNs and how can they be leveraged?',
                  weight: 8,
                },
              ],
            },
          ],
        },
      },
    },
  })
  async getInterviewQuestions(@Body('interviewId') interviewId: string) {
    return await this.interviewService.getInterviewQuestions(interviewId);
  }

  @Post('results')
  @ApiOperation({ summary: 'Get interview results' })
  @ApiBody({
    description: 'Provide interview ID to fetch results',
    examples: {
      example1: {
        summary: 'Fetch results of an interview',
        value: {
          interviewId: 'interview_1741329321841',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Interview results summary',
    content: {
      'application/json': {
        example: {
          interviewId: 'interview123',
          'Date of creation': '2025-03-07T08:30:00Z',
          'Date of completed': '2025-03-07T09:00:00Z',
          'chosen duration': 30,
          'real duration (min)': 28,
          score: 4.55555541,
          'all questions count': 5,
          'all follow-up questions': 2,
          'answered primary questions': '4/5',
          'answered follow-up questions': '2/2',
        },
      },
    },
  })
  async getInterviewResults(@Body('interviewId') interviewId: string) {
    return await this.interviewService.getInterviewResults(interviewId);
  }
}
