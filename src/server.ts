console.log('Iniciando servidor...');
import app from './app';
import { FastifyInstance } from 'fastify';

const PORT: number = 3000;

const start = async () => {
  try {
    const server: FastifyInstance = await app();
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.error('Erro ao subir o servidor Fastify:', err);
    process.exit(1);
  }
};

start();
