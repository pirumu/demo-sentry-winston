import {
  HttpException,
  HttpStatus, Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import * as Sentry from '@sentry/minimal';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getException() {
    this.logger.log('Before getException', AppService.name);
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  // gửi message qua sentry
  getMessage() {
    this.logger.log('Before getMessage',  AppService.name);
    Sentry.captureMessage(
      JSON.stringify({
        message: 'hello ',
      }),
    );
  }
}
