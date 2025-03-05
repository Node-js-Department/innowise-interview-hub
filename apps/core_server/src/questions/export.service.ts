import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class ExportService {
    constructor(
        private readonly configService: ConfigService,
    ){}

 async exportJson(res: Response) {
    try{
        const url = this.configService.get('DB_EXPORT_URL');
        if(!url){
            throw new Error('DB_EXPORT_URL is not defined');
        }

        const { data } = await axios.get(url, {
            responseType: 'stream', 
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const filename = `${date}-exported_data.json`;

        res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      res.flushHeaders();
      data.pipe(res);


    } catch( error ) {
        console.error('Export error', error);
        throw new Error('Cant export');
    }
 }
}