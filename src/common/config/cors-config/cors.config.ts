import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HTTPException } from 'src/common/exceptions';

export function getAllowedHostnames(): string[] | undefined {
  const hostsFromEnv = process.env.ALLOW_HOSTNAMES;
  return hostsFromEnv?.split(',').map((hostname) => hostname.trim());
}

const isAllowedHostname = (hostname?: string): boolean => {
  if (!hostname) {
    return true;
  }
  const allowedHosts = getAllowedHostnames();

  if (!allowedHosts || allowedHosts[0] === '*') {
    return true;
  }

  return allowedHosts.includes(hostname.trim());
};

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!isAllowedHostname(origin)) {
      callback(
        new HTTPException({
          code: 'CORS_ERROR',
          error: 'Locked',
          statusCode: 423,
          message: ['Сервис недоступен с вашего хоста!']
        }),
        false
      );
    }
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Origin', 'Authorization', 'Access-Control-Allow-Credentials'],
  credentials: true
};
