import { FastifyInstance } from 'fastify';
import { createHorarioController, getAllHorariosController, getHorarioByIdController, updateHorarioController, deleteHorarioController } from './horario-controller';

const horarioSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    dia_semana: { type: 'string' },
    horario: { type: 'string' },
    turma_id: { type: 'number' }
  }
};

export default async function horarioRoutes(fastify: FastifyInstance) {
    fastify.post('/', {
      schema: {
        tags: ['horarios'],
        summary: 'Criar um novo horário',
        body: {
          type: 'object',
          required: ['dia_semana', 'horario', 'turma_id'],
          properties: {
            dia_semana: { type: 'string' },
            horario: { type: 'string' },
            turma_id: { type: 'number' }
          }
        },
        response: {
          201: horarioSchema
        }
      }
    }, createHorarioController);

    fastify.get('/', {
      schema: {
        tags: ['horarios'],
        summary: 'Listar todos os horários',
        response: {
          200: {
            type: 'array',
            items: horarioSchema
          }
        }
      }
    }, getAllHorariosController);

    fastify.get('/:id', {
      schema: {
        tags: ['horarios'],
        summary: 'Buscar horário por ID',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: horarioSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, getHorarioByIdController);

    fastify.put('/:id', {
      schema: {
        tags: ['horarios'],
        summary: 'Atualizar horário',
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
            dia_semana: { type: 'string' },
            horario: { type: 'string' },
            turma_id: { type: 'number' }
          }
        },
        response: {
          200: horarioSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, updateHorarioController);

    fastify.delete('/:id', {
      schema: {
        tags: ['horarios'],
        summary: 'Deletar horário',
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
    }, deleteHorarioController);
} 