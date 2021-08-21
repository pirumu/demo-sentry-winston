import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/capture-exception')
  getException() {
    this.appService.getException();
  }

  @Get('/capture-message')
  getMessage() {
    this.appService.getMessage();
    return 'ok';
  }
}
