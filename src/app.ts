import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import usuarioRotas from './domains/usuario/usuario-routes';
import aulaRoutes from './domains/aula/aula-routes';
import pedidoRoutes from './domains/pedido/pedido-routes';
import disciplinaRoutes from './domains/disciplina/disciplina-routes';
import perfilRoutes from './domains/perfil/perfil-routes';
import predioRoutes from './domains/predio/predio-routes';
import recursoRoutes from './domains/recurso/recurso-routes';
import salaRoutes from './domains/sala/sala-routes';
import reservaRoutes from './domains/reserva/reserva-routes';
import turmaRoutes from './domains/turma/turma-routes';
import tipoRecursoRoutes from './domains/tipo-recurso/tipo-recurso-routes';
import curriculoRoutes from './domains/curriculo/curriculo-routes';
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
      { name: 'aulas', description: 'Endpoints relacionados a aulas' },
      { name: 'curriculos', description: 'Endpoints relacionados a curriculos' },
      { name: 'disciplinas', description: 'Endpoints relacionados a disciplinas' },
      { name: 'pedidos', description: 'Endpoints relacionados a pedidos' },
      { name: 'perfis', description: 'Endpoints relacionados a perfis' },
      { name: 'predios', description: 'Endpoints relacionados a predios' },
      { name: 'recursos', description: 'Endpoints relacionados a recursos' },
      { name: 'reservas', description: 'Endpoints relacionados a reservas' },
      { name: 'salas', description: 'Endpoints relacionados a salas' },
      { name: 'tipos de recurso', description: 'Endpoints relacionados a tipos de recurso' },
      { name: 'turmas', description: 'Endpoints relacionados a turmas' },
      { name: 'usuarios', description: 'Endpoints relacionados a usuarios' }
    ],
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'JWT token no formato: Bearer <token>'
      }
    },
    security: [
      { BearerAuth: [] }
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
app.register(turmaRoutes, { prefix: '/turmas' });
app.register(tipoRecursoRoutes, { prefix: '/tipos-recurso' });
app.register(curriculoRoutes, { prefix: '/curriculos' });

export default app;
