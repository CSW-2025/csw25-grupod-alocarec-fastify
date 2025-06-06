import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../config/auth';
import {
  createDisciplina,
  getAllDisciplinas,
  getDisciplinaById,
  updateDisciplina,
  deleteDisciplina,
} from './disciplina-controller';

const disciplinaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
    codigo: { type: 'string' },
    creditos: { type: 'number' },
    carga_horaria: { type: 'number' },
    ementa: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
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

export default async function disciplinaRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT
  fastify.addHook('preHandler', verifyJwt);
  fastify.post('/', {
    preHandler: verificarAdminOuCoordenador,
    schema: {
      tags: ['disciplinas'],
      summary: 'Criar uma nova disciplina',
      body: {
        type: 'object',
        required: ['nome', 'codigo', 'creditos', 'carga_horaria'],
        properties: {
          nome: { type: 'string' },
          codigo: { type: 'string' },
          creditos: { type: 'number' },
          carga_horaria: { type: 'number' },
          ementa: { type: 'string' }
        }
      },
      response: { 201: disciplinaSchema }
    }
  }, createDisciplina);

  fastify.get('/', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Listar todas as disciplinas',
      response: {
        200: {
          type: 'array',
          items: disciplinaSchema
        }
      }
    }
  }, getAllDisciplinas);

  fastify.get('/:id', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Buscar disciplina por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        200: disciplinaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, getDisciplinaById);

  fastify.put('/:id', {
    preHandler: verificarAdminOuCoordenador,
    schema: {
      tags: ['disciplinas'],
      summary: 'Atualizar disciplina',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          codigo: { type: 'string' },
          creditos: { type: 'number' },
          carga_horaria: { type: 'number' },
          ementa: { type: 'string' }
        }
      },
      response: {
        200: disciplinaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, updateDisciplina);

  fastify.delete('/:id', {
    preHandler: verificarAdminOuCoordenador,
    schema: {
      tags: ['disciplinas'],
      summary: 'Deletar disciplina',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        204: { type: 'null' },
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, deleteDisciplina);
}
