import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import * as fs from 'fs/promises';
import path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExportService {
    constructor(
        private readonly configService: ConfigService,
    ){}

 async exportJson() {
    try{
        const url = this.configService.get('DB_EXPORT_URL');
        if(!url){
            throw new Error('DB_EXPORT_URL is not defined');
        }

        const response = await axios.get(url.toString(), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const date = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const filePath = path.resolve(__dirname,`../../exportJson/${date}-exported_data.json`);
        await fs.writeFile(filePath, JSON.stringify(response.data, null, 2), 'utf-8');

    } catch( error ) {
        console.error('Export error', error);
        throw new Error('Cant export');
    }
 }
}