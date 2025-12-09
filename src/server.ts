const fastify = require('fastify');
import { FastifyInstance } from 'fastify';
import payload from 'payload';
import dotenv from 'dotenv';
import fastifyExpress from '@fastify/express';
import { seed } from './seed';

dotenv.config();
const server: FastifyInstance = fastify();

server.get('/', async (req, reply) => {
  reply.redirect('/admin');
});

const start = async () => {
  const payloadSecret = process.env.PAYLOAD_SECRET;
  if (!payloadSecret) {
    throw new Error('PAYLOAD_SECRET is not defined in the environment variables.');
  }
  await server.register(fastifyExpress);
  // Initialize Payload
  await payload.init({
    secret: payloadSecret,
    express: server.express,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      await seed(payload);
    },
  })

  server.use(payload.authenticate);
  
  const port = Number(process.env.PORT) || 3000;

  server.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`Server listening at ${address}`);
  });
}

start();
