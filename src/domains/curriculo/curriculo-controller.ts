import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculo, getAllCurriculos, getCurriculoById, updateCurriculo, deleteCurriculo } from './curriculo-repository';

export async function createCurriculoController(request: FastifyRequest<{ Body: CreateCurriculoInput }>, reply: FastifyReply) {
    const curriculo = await createCurriculo(request.body);
    return reply.code(201).send(curriculo);
}

export async function getAllCurriculosController(request: FastifyRequest, reply: FastifyReply) {
    const curriculos = await getAllCurriculos();
    return reply.send(curriculos);
}

export async function getCurriculoByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const curriculo = await getCurriculoById(request.params.id);
    if (!curriculo) {
        return reply.code(404).send({ message: 'Currículo não encontrado' });
    }
    return reply.send(curriculo);
}

export async function updateCurriculoController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateCurriculoInput }>, reply: FastifyReply) {
    const curriculo = await updateCurriculo(request.params.id, request.body);
    if (!curriculo) {
        return reply.code(404).send({ message: 'Currículo não encontrado' });
    }
    return reply.send(curriculo);
}

export async function deleteCurriculoController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const success = await deleteCurriculo(request.params.id);
    if (!success) {
        return reply.code(404).send({ message: 'Currículo não encontrado' });
    }
    return reply.code(204).send();
} 