import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './tipo-recurso-service';

export async function createTipoRecursoController(request: FastifyRequest, reply: FastifyReply) {
    const tipo = await service.createTipoRecursoService(request.body as any);
    reply.code(201).send(tipo);
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
