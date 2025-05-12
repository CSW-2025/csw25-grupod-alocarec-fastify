import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import usuarioRotas from './domains/usuario/usuario-routes';
import perfilRoutes from './domains/perfil/perfil-routes';
// import grupoRoutes from './domains/grupo/grupo-routes';

const app = Fastify();

// Habilitar CORS para todas as origens
app.register(cors, {
  origin: true,
});

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
      { name: 'usuarios', description: 'Endpoints relacionados a usuários' },
      { name: 'perfis', description: 'Endpoints relacionados a perfis' },
      // { name: 'grupos', description: 'Endpoints relacionados a grupos' },     
    ]
  }
});

app.register(swaggerUi, {
  routePrefix: '/documentation'
});

// Rotas
app.get('/', (req, reply) => {
  reply.redirect('/documentation');
});
app.register(usuarioRotas, { prefix: '/usuarios' });
app.register(perfilRoutes, { prefix: '/perfis' });
// app.register(grupoRoutes, { prefix: '/grupos' });

export default app;
