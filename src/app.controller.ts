import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * The AppController class handles incoming HTTP requests and returns responses.
 * It uses the AppService to get the data to be returned.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root endpoint.
   * @returns {string} A greeting message.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}