import Fastify from 'fastify';
import usuarioRotas from '@usuarios/usuario-routes';

const app = Fastify();

app.register(usuarioRotas, { prefix: '/usuarios' });

export default app;
