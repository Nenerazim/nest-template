import { ValidationError, ValidationPipe } from '@nestjs/common';
import { HTTPException } from '../exceptions';

export const globalValidationPipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    return new HTTPException({
      statusCode: 400,

      message: validationErrors.map((error) => ({
        property: error.property,
        message: Object.values(error.constraints)
      })),
      code: 'ClassValidator',
      error: 'Bad Request'
    });
  },
  transformOptions: {
    enableImplicitConversion: true
  }
});
