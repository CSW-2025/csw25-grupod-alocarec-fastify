import { FastifyInstance } from 'fastify';
import {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
} from './pedido-controller';

const pedidoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
    status: { type: 'string' },
    moderador_id: { type: 'number' },
    sala_id: { type: 'number' },
    recurso_id: { type: 'number' },
    aula_id: { type: 'number' },
    disciplina_id: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' }
  }
};

function verificarAdmin(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || user.perfil.nome !== 'Admin') {
    reply.code(403).send({ message: 'Acesso restrito a administradores.' });
    return;
  }
  done();
}

function verificarAdminCoordenadorProfessorInserir(request: any, reply: any, done: any) {
  const user = request.user;
  if (!user || !user.perfil || (user.perfil.nome !== 'Admin' && user.perfil.nome !== 'Coordenador' && user.perfil.nome !== 'Professor')) {
    reply.code(403).send({ message: 'Acesso restrito a administradores, coordenadores ou professores.' });
    return;
  }
  done();
}

export default async function pedidoRoutes(fastify: FastifyInstance) {
  // Middleware para autenticação JWT (igual usuario-routes)
  fastify.addHook('preHandler', async (request, reply) => {
    if (request.headers.authorization) {
      try {
        const token = request.headers.authorization.replace('Bearer ', '');
        const decoded = require('jsonwebtoken').verify(token, require('../../config/jwt').JWT_SECRET);
        request.user = decoded;
      } catch (err) {
        reply.code(401).send({ message: 'Token inválido.' });
      }
    }
  });

  fastify.post('/', {
    preHandler: verificarAdminCoordenadorProfessorInserir,
    schema: {
      tags: ['pedidos'],
      summary: 'Criar um novo pedido',
      body: {
        type: 'object',
        required: ['nome', 'status', 'aula_id', 'disciplina_id'],
        properties: {
          nome: { type: 'string' },
          status: { type: 'string' },
          moderador_id: { type: 'number' },
          sala_id: { type: 'number' },
          recurso_id: { type: 'number' },
          aula_id: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: { 201: pedidoSchema }
    }
  }, createPedido);

  fastify.get('/', {
    schema: {
      tags: ['pedidos'],
      summary: 'Listar todos os pedidos',
      response: {
        200: {
          type: 'array',
          items: pedidoSchema
        }
      }
    }
  }, getAllPedidos);

  fastify.get('/:id', {
    schema: {
      tags: ['pedidos'],
      summary: 'Buscar pedido por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        200: pedidoSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, getPedidoById);

  fastify.put('/:id', {
    preHandler: verificarAdmin,
    schema: {
      tags: ['pedidos'],
      summary: 'Atualizar pedido',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          status: { type: 'string' },
          moderador_id: { type: 'number' },
          sala_id: { type: 'number' },
          recurso_id: { type: 'number' },
          aula_id: { type: 'number' },
          disciplina_id: { type: 'number' }
        }
      },
      response: {
        200: pedidoSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, updatePedido);

  fastify.delete('/:id', {
    preHandler: verificarAdmin,
    schema: {
      tags: ['pedidos'],
      summary: 'Deletar pedido',
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
  }, deletePedido);
}
