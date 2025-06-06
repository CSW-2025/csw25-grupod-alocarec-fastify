import { FastifyInstance } from 'fastify';
import { verifyJwt } from '../../config/auth';
import {
  createAula,
  getAllAulas,
  getAulaById,
  updateAula,
  deleteAula,
} from './aula-controller';

const aulaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
    data_inicio: { type: 'string', format: 'date-time' },
    data_fim: { type: 'string', format: 'date-time' },
    descricao: { type: 'string' },
    horario: {
      type: 'string',
      enum: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P'],
      description: 'Horário da aula (A a P, conforme enum HorarioEnum)'
    },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

function verificarAdminCoordenadorOuProfessor(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || (user.perfil.nome !== 'Admin' && user.perfil.nome !== 'Coordenador' && user.perfil.nome !== 'Professor')) {
    reply.code(403).send({ message: 'Acesso restrito a administradores, coordenadores ou professores.' });
    return;
  }
  done();
}

export default async function aulaRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT
  fastify.addHook('preHandler', verifyJwt);
  fastify.post('/', {
    preHandler: verificarAdminCoordenadorOuProfessor,
    schema: {
      tags: ['aulas'],
      summary: 'Criar uma nova aula',
      body: {
        type: 'object',
        required: ['nome', 'data_inicio', 'data_fim'],
        properties: {
          nome: { type: 'string' },
          data_inicio: { type: 'string', format: 'date-time' },
          data_fim: { type: 'string', format: 'date-time' },
          descricao: { type: 'string' },
          horario: {
            type: 'string',
            enum: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P'],
            description: 'Horário da aula (A a P, conforme enum HorarioEnum)'
          }
        }
      },
      response: { 201: aulaSchema }
    }
  }, createAula);

  fastify.get('/', {
    schema: {
      tags: ['aulas'],
      summary: 'Listar todas as aulas',
      response: {
        200: {
          type: 'array',
          items: aulaSchema
        }
      }
    }
  }, getAllAulas);

  fastify.get('/:id', {
    schema: {
      tags: ['aulas'],
      summary: 'Buscar aula por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        200: aulaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, getAulaById);

  fastify.put('/:id', {
    preHandler: verificarAdminCoordenadorOuProfessor,
    schema: {
      tags: ['aulas'],
      summary: 'Atualizar aula',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          data_inicio: { type: 'string', format: 'date-time' },
          data_fim: { type: 'string', format: 'date-time' },
          descricao: { type: 'string' },
          horario: {
            type: 'string',
            enum: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','P'],
            description: 'Horário da aula (A a P, conforme enum HorarioEnum)'
          }
        }
      },
      response: {
        200: aulaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, updateAula);

  fastify.delete('/:id', {
    preHandler: verificarAdminCoordenadorOuProfessor,
    schema: {
      tags: ['aulas'],
      summary: 'Deletar aula',
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
  }, deleteAula);
}
