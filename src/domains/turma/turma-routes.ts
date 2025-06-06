import { FastifyInstance } from 'fastify';
import { createTurmaController, getAllTurmasController, getTurmaByIdController, updateTurmaController, deleteTurmaController } from './turma-controller';
import { verifyJwt } from '../../config/auth';

const turmaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    numero: { type: 'string' },
    semestre: { type: 'string' },
    professor_id: { type: 'number' },
    vagas: { type: 'number' },
    disciplina_id: { type: 'number' }
  }
};

function verificarAdminOuCoordenador(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || (user.perfil.nome !== 'Admin' && user.perfil.nome !== 'Coordenador')) {
    reply.code(403).send({ message: 'Acesso restrito a administradores ou coordenadores.' });
    return;
  }
  done();
}

export default async function turmaRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT
  fastify.addHook('preHandler', verifyJwt);
    fastify.post('/', { preHandler: verificarAdminOuCoordenador, schema: {
      tags: ['turmas'],
      summary: 'Criar uma nova turma',
      body: {
        type: 'object',
        required: ['numero', 'semestre', 'professor_id', 'vagas'],
        properties: {
          numero: { type: 'string' },
          semestre: { type: 'string' },
          professor_id: { type: 'number' },
          vagas: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: {
        201: turmaSchema
      }
    } }, createTurmaController);

    fastify.get('/', {
      schema: {
        tags: ['turmas'],
        summary: 'Listar todas as turmas',
        response: {
          200: {
            type: 'array',
            items: turmaSchema
          }
        }
      }
    }, getAllTurmasController);

    fastify.get('/:id', {
      schema: {
        tags: ['turmas'],
        summary: 'Buscar turma por ID',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: turmaSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, getTurmaByIdController);

    fastify.put('/:id', { preHandler: verificarAdminOuCoordenador, schema: {
      tags: ['turmas'],
      summary: 'Atualizar turma',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          numero: { type: 'string' },
          semestre: { type: 'string' },
          professor_id: { type: 'number' },
          vagas: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: {
        200: turmaSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    } }, updateTurmaController);

    fastify.delete('/:id', { preHandler: verificarAdminOuCoordenador, schema: {
      tags: ['turmas'],
      summary: 'Deletar turma',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: { type: 'null' },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    } }, deleteTurmaController);
} 