import { FastifyInstance } from 'fastify';
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva
} from './reserva-controller';

const reservaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    aula: { type: 'number' },
    recurso: { type: 'string' },
    observacao: { type: 'string' }
  }
};

export default async function reservaRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['reserva'],
      summary: 'Criar uma nova Reserva',
      body: {
        type: 'object',
        required: ['aula', 'recurso'],
        properties: {
          aula: { type: 'number' },
          recurso: { type: 'string' },
          observacao: { type: 'string' }
        }
      },
      response: {
        201: reservaSchema
      }
    }
  }, createReserva);

  fastify.get('/', {
    schema: {
      tags: ['reserva'],
      summary: 'Listar todas as Reservas',
      response: {
        200: {
          type: 'array',
          items: reservaSchema
        }
      }
    }
  }, getAllReservas);

  fastify.get('/:id', {
    schema: {
      tags: ['reserva'],
      summary: 'Buscar Reserva por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: reservaSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, getReservaById);

  fastify.put('/:id', {
    schema: {
      tags: ['reserva'],
      summary: 'Atualizar uma Reserva existente',
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
          aula: { type: 'number' },
          recurso: { type: 'string' },
          observacao: { type: 'string' }
        }
      },
      response: {
        200: reservaSchema,
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, updateReserva);

  fastify.delete('/:id', {
    schema: {
      tags: ['reserva'],
      summary: 'Deletar uma Reserva',
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
  }, deleteReserva);
}
