import { Logger } from '@nestjs/common';
import { AxiosError } from 'axios';

export class HttpLogger {
  private loggerService: Logger;

  constructor(name: string) {
    this.loggerService = new Logger(name);
  }

  error(error: AxiosError, methodName?: string) {
    if (error) {
      if (error?.response) {
        if (error?.response?.data) {
          return this.loggerService.error(error?.response?.data, methodName);
        }
        if (error?.response?.statusText) {
          return this.loggerService.error(error?.response?.statusText, methodName);
        }
      }
      if (error?.message) {
        return this.loggerService.error(error.message, methodName);
      }
      return this.loggerService.error(error, methodName);
    }
    return this.loggerService.error('Unexpected error. Error variable is not defined', methodName);
  }
}
