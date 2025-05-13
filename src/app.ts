import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import usuarioRotas from './domains/usuario/usuario-routes';
import aulaRoutes from './domains/aula/aula-routs';
import pedidoRoutes from './domains/pedido/pedido-routs';
import disciplinaRoutes from './domains/disciplina/disciplina-routes';
import perfilRoutes from './domains/perfil/perfil-routes';
import predioRoutes  from './domains/predio/predio-routs';
import recursoRoutes  from './domains/recurso/recurso-routs';
import salaRoutes from './domains/sala/sala-routs';
import reservaRoutes from './domains/reserva/reserva-routs';
// ajuste o alias se necessário

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
      { name: 'prédios', description: 'Endpoints relacionados a prédios' },
      { name: 'recursos', description: 'Endpoints relacionados a recursos' },
      { name: 'salas', description: 'Endpoints relacionados a salas' },
      { name: 'reservas', description: 'Endpoints relacionados a reservas' },
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
app.register(aulaRoutes, { prefix: '/aulas' });
app.register(pedidoRoutes, { prefix: '/pedidos' });
app.register(disciplinaRoutes, { prefix: '/disciplinas' });
app.register(perfilRoutes, { prefix: '/perfis' });
app.register(predioRoutes, { prefix: '/predios' });
app.register(recursoRoutes, { prefix: '/recursos' });
app.register(salaRoutes, { prefix: '/salas' });
app.register(reservaRoutes, { prefix: '/reservas' });


export default app;
