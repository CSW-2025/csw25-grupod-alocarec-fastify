import { FastifyRequest, FastifyReply } from 'fastify';

export async function createTipoRecursoController(request: FastifyRequest, reply: FastifyReply) {
    reply.send('createTipoRecursoController');
}

export async function getAllTipoRecursosController(request: FastifyRequest, reply: FastifyReply) {
    reply.send('getAllTipoRecursosController');
}

export async function getTipoRecursoByIdController(request: FastifyRequest, reply: FastifyReply) {
    reply.send('getTipoRecursoByIdController');
}

export async function updateTipoRecursoController(request: FastifyRequest, reply: FastifyReply) {
    reply.send('updateTipoRecursoController');
}

export async function deleteTipoRecursoController(request: FastifyRequest, reply: FastifyReply) {
    reply.send('deleteTipoRecursoController');
}
