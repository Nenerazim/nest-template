import { FastifyReply } from 'fastify';

export class ResponseBuilder<T = unknown, D = unknown> {
  private readonly status: number;
  private readonly dataDto: {
    success: boolean;
    message?: string;
    status: number;
    total?: number;
    page?: number;
    data?: T;
    errors?: D;
  };
  private readonly defaultMessagesList = {
    200: 'Data retrieved successfully',
    201: 'Created',
    204: 'No content',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    418: 'Server error',
    422: 'Unprocessable entity',
    500: 'Internal Server error'
  };

  constructor(status: number, success: boolean) {
    this.status = status;
    this.dataDto = {
      status,
      success,
      message: this.defaultMessagesList?.[status]
    };
  }

  public static success<T>(status: number = 200) {
    return new this<T>(status, true);
  }

  public static error<T>(status: number = 418) {
    return new this<T>(status, false);
  }

  public setData(data: T) {
    this.dataDto.data = data;
    return this;
  }

  public setMessage(message: string) {
    this.dataDto.message = message;
    return this;
  }

  public setTotal(total: number) {
    this.dataDto.total = total;
    return this;
  }

  public setPagination(page: number, total: number) {
    this.dataDto.page = page;
    this.dataDto.total = total;
    return this;
  }

  public setErrors(errors: D) {
    this.dataDto.errors = errors;
    return this;
  }

  public setStatus(status: number, response: FastifyReply) {
    response.status(this.status);
    return this;
  }

  public setCookies(cookies: Record<string, string>, response: FastifyReply) {
    if (Object.keys(cookies).length) {
      for (const cookie in cookies) {
        response.setCookie(cookie, cookies[cookie], {
          httpOnly: false,
          path: '/',
          sameSite: 'lax'
        });
      }
    }
    return this;
  }

  public setHeaders(headers: Record<string, string>, response: FastifyReply) {
    response.headers(headers);
    return this;
  }

  public build() {
    return this.dataDto;
  }
}
