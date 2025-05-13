import { FastifyInstance } from 'fastify';
import { createTipoRecursoController, getAllTipoRecursosController, getTipoRecursoByIdController, updateTipoRecursoController, deleteTipoRecursoController } from './tipo-recurso-controller';

export default async function tipoRecursoRoutes(fastify: FastifyInstance) {
    fastify.post('/', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Criar um novo tipo de recurso',
        }
    }, createTipoRecursoController);
    fastify.get('/', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Listar todos os tipos de recurso',
        }
    }, getAllTipoRecursosController);
    fastify.get('/:id', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Buscar tipo de recurso por ID',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } }
            }
        }
    }, getTipoRecursoByIdController);
    fastify.put('/:id', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Atualizar tipo de recurso',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } }
            }
        }
    }, updateTipoRecursoController);
    fastify.delete('/:id', {
        schema: {
            tags: ['tipos de recurso'],
            summary: 'Deletar tipo de recurso',
            params: {
                type: 'object',
                required: ['id'],
                properties: { id: { type: 'string' } }
            }
        }
    }, deleteTipoRecursoController);
}
