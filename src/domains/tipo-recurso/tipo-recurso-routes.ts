import { FastifyInstance } from 'fastify';
import { createTipoRecursoController, getAllTipoRecursosController, getTipoRecursoByIdController, updateTipoRecursoController, deleteTipoRecursoController } from './tipo-recurso-controller';

export default async function tipoRecursoRoutes(fastify: FastifyInstance) {
    fastify.post('/', createTipoRecursoController);
    fastify.get('/', getAllTipoRecursosController);
    fastify.get('/:id', getTipoRecursoByIdController);
    fastify.put('/:id', updateTipoRecursoController);
    fastify.delete('/:id', deleteTipoRecursoController);
}
