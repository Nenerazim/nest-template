import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import { AppModule } from './app.module';
import {
  AllExceptionsFilter,
  AppConfig,
  HttpExceptionFilter,
  RpcExceptionFilter,
  cookieConfig,
  corsConfig,
  globalValidationPipe,
  helmetConfig,
  loggerConfig,
  swaggerConfig,
  versioningConfig
} from './common';
import process from 'node:process';

async function bootstrap() {
  const adapter = new FastifyAdapter({
    logger: loggerConfig,
    maxParamLength: 1000
  });

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app
    .enableShutdownHooks()
    .enableVersioning(versioningConfig)
    .useGlobalPipes(globalValidationPipe)
    .useGlobalFilters(
      new AllExceptionsFilter(httpAdapter, process.env.SHOW_GLOBAL_LOGS === 'true'),
      new HttpExceptionFilter(httpAdapter),
      new RpcExceptionFilter(httpAdapter)
    )
    .useStaticAssets({
      root: join(__dirname, '..', 'public'),
      prefix: '/assets'
    })
    .enableCors(corsConfig);

  await Promise.all([app.register(helmet, helmetConfig), app.register(fastifyCookie, cookieConfig)]);

  swaggerConfig(app);

  const appConfig = app.get(ConfigService).get<AppConfig>('app');

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
