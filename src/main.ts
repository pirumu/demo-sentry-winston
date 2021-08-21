import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { SentryInterceptor } from './sentry.interceptor';
import { LogLevel } from '@sentry/types';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //ghi de log luc bootstrap
    logger: WinstonModule.createLogger({
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
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'combined.log',
        }),
      ],
      handleExceptions: true,
    }),
  });

  Sentry.init({
    dsn: 'https://535f8b9a1db543ce94203d2eb8ced2c9@o968521.ingest.sentry.io/5919867',
    debug: false,
    environment: 'dev', // | 'production' | 'some_environment'
    //   release: 'some_release' | null,  must create a release in sentry.io dashboard
    logLevel: LogLevel.Debug,
  });

  app.useGlobalInterceptors(new SentryInterceptor());

  await app.listen(3001, () => {
    app['logger'].log(`nest start http://127.0.0.1:3001`);
  });
}
(async () => {
  await bootstrap();
})();
