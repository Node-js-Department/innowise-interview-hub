import { ImportService } from './import.service';
import { ExportService } from './export.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpException, HttpStatus, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import path from 'path';

import * as fs from 'fs/promises';
import path from 'path';

import { Controller, Get, HttpException, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdatedAnswerDTO } from './questions.dto';

import { TAny } from '@packages/shared';

import { ExportService } from './export.service';
import { ImportService } from './import.service';
import { QuestionsService } from './questions.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService,
    private readonly importService: ImportService,
    private readonly exportService: ExportService
  ) {}

  @ApiOperation({ summary: 'Rate and comment on the candidate' })
  @ApiResponse({ status: 404, description: 'Interviewer or InterviewQuestion not found!' })
  @ApiOkResponse()
  @Put('evaluate')
  async takeEvaluated(@Body() dto: UpdatedAnswerDTO) {
    return this.questionsService.takeEvaluatedQuestionsForInterview(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions (json)' })
  @ApiResponse({
    status: 200,
    description: 'return all questions',
  })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('export')
  @ApiOperation({ summary: 'Export questions from db' })
  @ApiResponse({ status: 200, description: 'Data exported successfully' })
  @ApiResponse({ status: 500, description: 'Export error' })
  async ExportJson(@Res() res: Response) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dataToExport = await this.exportService.exportJson(res);
      return {
        message: 'Data exported successfully',
      };
    } catch (error) {
      console.error('Export error', error);
      throw new HttpException(`Export error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Post('import/static')
  @ApiOperation({ summary: 'Import static data from server folder' })
  @ApiResponse({ status: 201, description: 'Data imported successfully' })
  @ApiResponse({ status: 500, description: 'Import error' })
  async importStatic(): Promise<TAny> {
    try {
      const result = await this.importService.importDataStatic();
      return {
        message: ' Data imported successfully',
        result,
      };
    } catch (error) {
      console.error(' Import error:', error);
      throw new HttpException(`Import error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('import')
  @ApiOperation({ summary: 'Import file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded and processed successfully' })
  @ApiResponse({ status: 400, description: 'File is required' })
  @ApiResponse({ status: 500, description: 'Upload error' })
  @UseInterceptors(FileInterceptor('file'))

  async upload(@UploadedFile() file: Express.Multer.File): Promise<TAny> {
    try {
      if (!file) {
        throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
      }

      const uploadDir = path.resolve(__dirname, '../../uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, file.originalname);
      await fs.writeFile(filePath, file.buffer);

      const result = await this.importService.importDataDynamic(filePath);

      return {
        message: ' File uploaded and processed successfully',
        result,
      };
    } catch (error) {
      console.error('Upload error', error);
      throw new HttpException(`Upload error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
