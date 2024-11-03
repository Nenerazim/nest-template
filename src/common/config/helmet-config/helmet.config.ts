import { FastifyHelmetOptions } from '@fastify/helmet';

export const helmetConfig: FastifyHelmetOptions = {
  contentSecurityPolicy: false
};
