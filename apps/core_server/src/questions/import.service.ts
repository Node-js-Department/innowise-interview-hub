import * as fs from 'fs/promises';
import path from 'path';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

import { TAny } from '@packages/shared';

@Injectable()
export class ImportService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  async importDataStatic(): Promise<TAny> {
    try {

      const filePath = path.resolve(__dirname, '../../importJson/q.json');
      const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });

      const jsonData = JSON.parse(fileContent);

      const url = this.configService.get('DB_IMPORT_URL');
      if (!url) {
        throw new HttpException('DB_IMPORT_URL is not defined', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('import error', error);
      throw new HttpException(`Cant import: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async importDataDynamic(filePath: string): Promise<TAny> {
    try {
      await fs.access(filePath);

      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      const url = this.configService.get('DB_IMPORT_URL');
      if (!url) {
        throw new HttpException('DB_IMPORT_URL is not defined', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fs.unlink(filePath);

      return response.data;
    } catch (error: unknown) {
      console.error('import error', error);
      throw new HttpException(`Import error: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
