import { registerAs } from '@nestjs/config';

export interface AppConfig {
  /**
   * Порт на котором запустить сервер
   */
  port: number;
  /**
   * Хост на котором запустить сервер
   */
  host: string;

  /**
   * Url на котором запущен сервис
   */
  url: string;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT, 10),
    host: process.env.HOST,
    url: process.env.URL
  })
);
