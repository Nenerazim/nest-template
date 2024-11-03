import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { HTTPException } from 'src/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly showFullExceptions: boolean = false;
  constructor(
    private readonly httpAdapter: AbstractHttpAdapter,
    showFullExceptions = false
  ) {
    this.showFullExceptions = showFullExceptions;
  }

  catch(exception: HTTPException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.I_AM_A_TEAPOT;

    const httpResponse = exception instanceof HttpException ? exception.getResponse() : null;
    if (this.showFullExceptions) {
      console.log(exception);
    }

    this.httpAdapter.reply(ctx.getResponse(), httpResponse, httpStatus);
  }
}
