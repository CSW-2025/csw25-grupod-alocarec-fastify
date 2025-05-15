import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTurmaInput, UpdateTurmaInput } from './turma-entity';
import { createTurmaService, getAllTurmasService, getTurmaByIdService, updateTurmaService, deleteTurmaService } from './turma-service';

export async function createTurmaController(request: FastifyRequest<{ Body: CreateTurmaInput }>, reply: FastifyReply) {
    const turma = await createTurmaService(request.body);
    return reply.code(201).send(turma);
}

export async function getAllTurmasController(request: FastifyRequest, reply: FastifyReply) {
    const turmas = await getAllTurmasService();
    return reply.send(turmas);
}

export async function getTurmaByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const turma = await getTurmaByIdService(request.params.id);
    return reply.send(turma);
}

export async function updateTurmaController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateTurmaInput }>, reply: FastifyReply) {
    const turma = await updateTurmaService(request.params.id, request.body);
    return reply.send(turma);
}

export async function deleteTurmaController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    await deleteTurmaService(request.params.id);
    return reply.code(204).send();
} 