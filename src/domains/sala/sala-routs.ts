import { FastifyInstance } from 'fastify';
import {
  createSala,
  getAllSalas,
  getSalaById,
  updateSala,
  deleteSala,
} from './sala-controller';

export default async function salaRoutes(app: FastifyInstance) {
  app.post('/', {
    schema: {
      tags: ['salas'],
      summary: 'Criar uma nova sala',
      body: {
        type: 'object',
        required: ['nome', 'capacidade', 'predioId'],
        properties: {
          nome: { type: 'string' },
          capacidade: { type: 'number' },
          predioId: { type: 'number' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            capacidade: { type: 'number' },
            predioId: { type: 'number' },
            predio: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, createSala);

  app.get('/', {
    schema: {
      tags: ['salas'],
      summary: 'Listar todas as salas',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' },
              capacidade: { type: 'number' },
              predioId: { type: 'number' },
              predio: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  nome: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, getAllSalas);

  app.get('/:id', {
    schema: {
      tags: ['salas'],
      summary: 'Buscar sala por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            capacidade: { type: 'number' },
            predioId: { type: 'number' },
            predio: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, getSalaById);

  app.put('/:id', {
    schema: {
      tags: ['salas'],
      summary: 'Atualizar sala',
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
          nome: { type: 'string' },
          capacidade: { type: 'number' },
          predioId: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            capacidade: { type: 'number' },
            predioId: { type: 'number' },
            predio: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, updateSala);

  app.delete('/:id', {
    schema: {
      tags: ['salas'],
      summary: 'Deletar sala',
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
  }, deleteSala);
} 