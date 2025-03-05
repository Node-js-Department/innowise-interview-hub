import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as fs from 'fs/promises';
import path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImportService {
   constructor(
          private readonly configService: ConfigService,
      ){}
      
  async importDataStatic(): Promise<any> {
    try {

      const filePath = path.resolve(__dirname,'../../importJson/q.json');
      const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });

      const jsonData = JSON.parse(fileContent);

      const url = this.configService.get('DB_IMPORT_URL');
      if(!url){
        throw new Error('DB_IMPORT_URL is not defined')
      }
      
      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('import error', error);
      throw new Error('cant import');
    }
  }

  async importDataDynamic(filePath: string): Promise<any> {
    try {
      await fs.access(filePath);

      const fileContent = await fs.readFile(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      const url = this.configService.get('DB_IMPORT_URL');
      if(!url){
        throw new Error('DB_IMPORT_URL is not defined')
      }
      const response = await axios.post(url, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await fs.unlink(filePath);

      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Import error', error.message);
      } else {
        console.error('Unknown error', error);
      }
      throw new Error('Import error');
    }
    
  }
}