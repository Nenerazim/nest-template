import { FastifyCookieOptions } from '@fastify/cookie';

export const cookieConfig: FastifyCookieOptions = {
  parseOptions: {
    path: '/',
    signed: false
  }
};
