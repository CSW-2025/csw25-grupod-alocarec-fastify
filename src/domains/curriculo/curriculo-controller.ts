import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculoService, getAllCurriculosService, getCurriculoByIdService, updateCurriculoService, deleteCurriculoService } from './curriculo-service';

export async function createCurriculoController(request: FastifyRequest<{ Body: CreateCurriculoInput }>, reply: FastifyReply) {
    const curriculo = await createCurriculoService(request.body);
    return reply.code(201).send(curriculo);
}

export async function getAllCurriculosController(request: FastifyRequest, reply: FastifyReply) {
    const curriculos = await getAllCurriculosService();
    return reply.send(curriculos);
}

export async function getCurriculoByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const curriculo = await getCurriculoByIdService(request.params.id);
    return reply.send(curriculo);
}

export async function updateCurriculoController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateCurriculoInput }>, reply: FastifyReply) {
    const curriculo = await updateCurriculoService(request.params.id, request.body);
    return reply.send(curriculo);
}

export async function deleteCurriculoController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    await deleteCurriculoService(request.params.id);
    return reply.code(204).send();
} 