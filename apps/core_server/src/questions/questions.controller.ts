import { ImportService } from './import.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpException, HttpStatus, UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import path from 'path';
import * as fs from 'fs/promises';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService,
    private readonly importService: ImportService,
  ) {}


  @Get()
  findAll()  {
    return this.questionsService.findAll();
  }

  @Post('import/static')
  async importStatic(): Promise<any> {
    try {
      const result = await this.importService.importDataStatic();
      return {
        message: ' Data imported successfully',
        result,
      }
    } catch (error) {
      console.error(' Import error:', error);
      return {
        message: 'Import error',
      }
    }
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))

  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
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
      throw new HttpException(' Upload error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
