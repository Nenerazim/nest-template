import { registerAs } from '@nestjs/config';

export interface ThrottlerConfig {
  ttl: number;
  limit: number;
}

export default registerAs(
  'throttler',
  (): ThrottlerConfig => ({
    ttl: parseInt(process.env.THROTTLE_TTL),
    limit: parseInt(process.env.THROTTLE_LIMIT)
  })
);
