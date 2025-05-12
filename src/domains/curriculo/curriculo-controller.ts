import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateCurriculoInput, UpdateCurriculoInput } from './curriculo-entity';
import { createCurriculo, getAllCurriculos, getCurriculoById, updateCurriculo, deleteCurriculo } from './curriculo-repository';

export async function createCurriculoController(request: FastifyRequest<{ Body: CreateCurriculoInput }>, reply: FastifyReply) {
    try {
        const curriculo = await createCurriculo(request.body);
        return reply.code(201).send(curriculo);
    } catch (error) {
        reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ocorreu um erro inesperado ao criar o currículo.'
        });
    }
}

export async function getAllCurriculosController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const curriculos = await getAllCurriculos();
        return reply.send(curriculos);
    } catch (error) {
        reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ocorreu um erro inesperado ao listar os currículos.'
        });
    }
}

export async function getCurriculoByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
        const curriculo = await getCurriculoById(request.params.id);
        if (!curriculo) {
            return reply.code(404).send({ message: 'Currículo não encontrado' });
        }
        return reply.send(curriculo);
    } catch (error) {
        reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ocorreu um erro inesperado ao buscar o currículo.'
        });
    }
}

export async function updateCurriculoController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateCurriculoInput }>, reply: FastifyReply) {
    try {
        const curriculo = await updateCurriculo(request.params.id, request.body);
        if (!curriculo) {
            return reply.code(404).send({ message: 'Currículo não encontrado' });
        }
        return reply.send(curriculo);
    } catch (error) {
        reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ocorreu um erro inesperado ao atualizar o currículo.'
        });
    }
}

export async function deleteCurriculoController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    try {
        const success = await deleteCurriculo(request.params.id);
        if (!success) {
            return reply.code(404).send({ message: 'Currículo não encontrado' });
        }
        return reply.code(204).send();
    } catch (error) {
        reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ocorreu um erro inesperado ao deletar o currículo.'
        });
    }
} 