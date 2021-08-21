import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(),
          ),
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
          maxsize: 10485760, //bytes
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'combined.log',
          maxsize: 10485760, //bytes
        }),
      ],
      handleExceptions: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
