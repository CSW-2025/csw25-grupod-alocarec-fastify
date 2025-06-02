import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
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
import { errorHandler } from './middleware-error-handler';
import usuarioRoutes from './domains/usuario/usuario-routes';
// ajuste o alias se necessário

export async function build(): Promise<FastifyInstance> {
  const app = fastify({
    logger: true
  });

  app.setErrorHandler(errorHandler);

  // Plugins
  await app.register(cors, {
    origin: true,
  });
  await app.register(swagger, {
    swagger: {
      info: {
        title: 'AlocaRec API',
        description: 'API do sistema AlocaRec',
        version: '1.0.0'
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  });
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  });

  // Rotas
  app.get('/', (req, reply) => {
    reply.redirect('/docs');
  });
  app.register(pedidoRoutes, { prefix: '/pedidos' });
  app.register(usuarioRoutes, { prefix: '/usuarios' });
  app.register(aulaRoutes, { prefix: '/aulas' });
  app.register(disciplinaRoutes, { prefix: '/disciplinas' });
  app.register(perfilRoutes, { prefix: '/perfis' });
  app.register(predioRoutes, { prefix: '/predios' });
  app.register(recursoRoutes, { prefix: '/recursos' });
  app.register(salaRoutes, { prefix: '/salas' });
  app.register(reservaRoutes, { prefix: '/reservas' });
  app.register(turmaRoutes, { prefix: '/turmas' });
  app.register(tipoRecursoRoutes, { prefix: '/tipos-recurso' });
  app.register(curriculoRoutes, { prefix: '/curriculos' });

  return app;
}

export default build;
