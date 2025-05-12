console.log('Iniciando servidor...');
import app from './app';

const PORT: number = 3000;

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    console.error('Erro ao subir o servidor Fastify:', err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});