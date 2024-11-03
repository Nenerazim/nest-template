import { registerAs } from '@nestjs/config';

export interface RedisConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export default registerAs(
  'redis',
  (): RedisConfig => ({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
  })
);
