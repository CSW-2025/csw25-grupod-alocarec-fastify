import { FastifyInstance } from 'fastify';
import { createTurmaController, getAllTurmasController, getTurmaByIdController, updateTurmaController, deleteTurmaController } from './turma-controller';

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

export default async function turmaRoutes(fastify: FastifyInstance) {
    fastify.post('/', {
      schema: {
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
      }
    }, createTurmaController);

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

    fastify.put('/:id', {
      schema: {
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
      }
    }, updateTurmaController);

    fastify.delete('/:id', {
      schema: {
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
      }
    }, deleteTurmaController);
} 