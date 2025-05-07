import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import usuarioRotas from '@usuarios/usuario-routes';

const app = Fastify();

// Configuração do Swagger
app.register(swagger, {
  swagger: {
    info: {
      title: 'API de Alocação de Recursos',
      description: 'API para gerenciamento de alocação de recursos',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'usuarios', description: 'Endpoints relacionados a usuários' }
    ]
  }
});

app.register(swaggerUi, {
  routePrefix: '/documentation'
});

// Rotas
app.register(usuarioRotas, { prefix: '/usuarios' });

export default app;
