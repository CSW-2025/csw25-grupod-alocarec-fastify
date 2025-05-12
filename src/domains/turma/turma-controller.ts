import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateTurmaInput, UpdateTurmaInput } from './turma-entity';
import { createTurma, getAllTurmas, getTurmaById, updateTurma, deleteTurma } from './turma-repository';

export async function createTurmaController(request: FastifyRequest<{ Body: CreateTurmaInput }>, reply: FastifyReply) {
    const turma = await createTurma(request.body);
    return reply.code(201).send(turma);
}

export async function getAllTurmasController(request: FastifyRequest, reply: FastifyReply) {
    const turmas = await getAllTurmas();
    return reply.send(turmas);
}

export async function getTurmaByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const turma = await getTurmaById(request.params.id);
    if (!turma) {
        return reply.code(404).send({ message: 'Turma não encontrada' });
    }
    return reply.send(turma);
}

export async function updateTurmaController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateTurmaInput }>, reply: FastifyReply) {
    const turma = await updateTurma(request.params.id, request.body);
    if (!turma) {
        return reply.code(404).send({ message: 'Turma não encontrada' });
    }
    return reply.send(turma);
}

export async function deleteTurmaController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const success = await deleteTurma(request.params.id);
    if (!success) {
        return reply.code(404).send({ message: 'Turma não encontrada' });
    }
    return reply.code(204).send();
} 