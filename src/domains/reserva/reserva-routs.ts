import { FastifyInstance } from 'fastify';
import {
  createReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva,
} from './reserva-controller';

function verificarAdminCoordenadorOuProfessor(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || (user.perfil.nome !== 'Admin' && user.perfil.nome !== 'Coordenador' && user.perfil.nome !== 'Professor')) {
    reply.code(403).send({ message: 'Acesso restrito a administradores, coordenadores ou professores.' });
    return;
  }
  done();
}

export default async function reservaRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: verificarAdminCoordenadorOuProfessor, schema: {
    tags: ['reservas'],
    summary: 'Criar uma nova reserva',
    body: {
      type: 'object',
      required: ['salaId', 'usuarioId', 'dataHora'],
      properties: {
        salaId: { type: 'number' },
        usuarioId: { type: 'number' },
        dataHora: { type: 'string', format: 'date-time' }
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          salaId: { type: 'number' },
          usuarioId: { type: 'number' },
          dataHora: { type: 'string', format: 'date-time' },
          sala: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } },
          usuario: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } }
        }
      }
    }
  } }, createReserva);

  app.get('/', {
    schema: {
      tags: ['reservas'],
      summary: 'Listar todas as reservas',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              salaId: { type: 'number' },
              usuarioId: { type: 'number' },
              dataHora: { type: 'string', format: 'date-time' },
              sala: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } },
              usuario: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } }
            }
          }
        }
      }
    }
  }, getAllReservas);

  app.get('/:id', {
    schema: {
      tags: ['reservas'],
      summary: 'Buscar reserva por ID',
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
            salaId: { type: 'number' },
            usuarioId: { type: 'number' },
            dataHora: { type: 'string', format: 'date-time' },
            sala: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } },
            usuario: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } }
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
  }, getReservaById);

  app.put('/:id', { preHandler: verificarAdminCoordenadorOuProfessor, schema: {
    tags: ['reservas'],
    summary: 'Atualizar reserva',
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
        salaId: { type: 'number' },
        usuarioId: { type: 'number' },
        dataHora: { type: 'string', format: 'date-time' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          salaId: { type: 'number' },
          usuarioId: { type: 'number' },
          dataHora: { type: 'string', format: 'date-time' },
          sala: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } },
          usuario: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } }
        }
      },
      404: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    }
  } }, updateReserva);

  app.delete('/:id', { preHandler: verificarAdminCoordenadorOuProfessor, schema: {
    tags: ['reservas'],
    summary: 'Deletar reserva',
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
  } }, deleteReserva);
} 