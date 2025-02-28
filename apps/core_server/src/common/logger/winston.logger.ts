import { ConfigService } from '@nestjs/config';
import moment from 'moment';
import * as winston from 'winston';

export const createWinstonLogger = (configService: ConfigService) => {
  const logLevel = configService.get<string>('LOG_LEVEL', 'info');

  return winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
      winston.format.timestamp({
        format: () => moment().format('DD.MM.YYYY HH:mm:ss.SSS Z'),
      })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.prettyPrint(),
          winston.format.printf(({ timestamp, level, message }) =>
            `(${timestamp}) [${level}]: ${message}`)
        ),
      }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
  });
};
