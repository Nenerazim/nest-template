import { FastifyError, FastifyReply } from 'fastify';

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z'
      }
    },
    serializers: {
      res: (res: FastifyReply) => {
        return {
          statusCode: res.statusCode,
          headers: res.getHeaders()
        };
      },
      err: (err: FastifyError) => {
        return {
          err: err
        };
      }
    }
  },
  production: true,
  test: false
};
export const loggerConfig = envToLogger[process.env.NODE_ENV ?? 'production'] ?? true;
