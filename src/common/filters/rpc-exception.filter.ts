import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ExceptionBody } from '../exceptions';
import { ErrorStatusMapper } from '../utils/errorStatusMapper';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: RpcException, host: ArgumentsHost) {
    const logger = new Logger('GRPC');
    const ctx = host.switchToRpc();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.I_AM_A_TEAPOT;

    const error: any = exception.getError();

    const mapper = new ErrorStatusMapper();
    const statusCode = mapper.grpcToHttpMapper(error.statusCode);

    const body: ExceptionBody = {
      statusCode,
      message: [error.message],
      code: 'GRPC'
    };

    if (httpStatus === HttpStatus.I_AM_A_TEAPOT || httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      logger.error({
        path: this.httpAdapter.getRequestUrl(ctx.getData()),
        timestamp: new Date().toISOString(),
        status: httpStatus,
        res: body,
        stack: exception.stack
      });
    } else {
      logger.warn({
        path: this.httpAdapter.getRequestUrl(ctx.getData()),
        timestamp: new Date().toISOString(),
        status: httpStatus,
        res: body
      });
    }
    this.httpAdapter.reply(ctx.getData(), body, statusCode);
  }
}
