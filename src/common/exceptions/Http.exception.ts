import { HttpException } from '@nestjs/common';

export interface ExceptionBody {
  statusCode: number;
  message: string[] | { property: string; message: string[] }[];
  code?: number | string;
  error?: string;
  cause?: any;
}

export class HTTPException extends HttpException {
  constructor(body: ExceptionBody) {
    super(
      {
        statusCode: body.statusCode,
        message: body.message,
        code: body.code,
        error: body.error
      },
      body.statusCode,
      {
        cause: body.cause
      }
    );
  }
}
