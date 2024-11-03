import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const logger = new Logger('HTTP');

    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.I_AM_A_TEAPOT;

    const httpResponse = exception instanceof HttpException ? exception.getResponse() : null;

    const stack = exception instanceof HttpException ? exception.stack : null;

    if (httpStatus === HttpStatus.I_AM_A_TEAPOT || httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      logger.error({
        path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
        timestamp: new Date().toISOString(),
        status: httpStatus,
        res: httpResponse,
        stack: stack,
        apiException: exception
      });
    } else {
      logger.warn({
        path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
        timestamp: new Date().toISOString(),
        status: httpStatus,
        res: httpResponse,
        apiException: exception
      });
    }

    this.httpAdapter.reply(ctx.getResponse(), httpResponse, httpStatus);
  }
}
