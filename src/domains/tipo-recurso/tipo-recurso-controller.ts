import { FastifyRequest, FastifyReply } from 'fastify';
import * as service from './tipo-recurso-service';
import { UpdateTipoRecursoInput } from './tipo-recurso-entity';

export async function createTipoRecursoController(request: FastifyRequest, reply: FastifyReply) {
    const tipo = await service.createTipoRecursoService(request.body as any);
    reply.code(201).send(tipo);
}

export async function getAllTipoRecursosController(
    _request: FastifyRequest,
    reply: FastifyReply
) {
    const tipos = await service.getAllTipoRecursosService();
    return reply.send(tipos);
}

export async function getTipoRecursoByIdController(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    const tipo = await service.getTipoRecursoByIdService(request.params.id);
    return reply.send(tipo);
}

export async function updateTipoRecursoController(
    request: FastifyRequest<{ Params: { id: number }; Body: UpdateTipoRecursoInput }>,
    reply: FastifyReply
) {
    const tipo = await service.updateTipoRecursoService(request.params.id, request.body);
    return reply.send(tipo);
}

export async function deleteTipoRecursoController(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
) {
    await service.deleteTipoRecursoService(request.params.id);
    return reply.code(204).send();
}
