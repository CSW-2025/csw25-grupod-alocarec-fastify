import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateHorarioInput, UpdateHorarioInput } from './horario-entity';
import { createHorario, getAllHorarios, getHorarioById, updateHorario, deleteHorario } from './horario-repository';

export async function createHorarioController(request: FastifyRequest<{ Body: CreateHorarioInput }>, reply: FastifyReply) {
    const horario = await createHorario(request.body);
    return reply.code(201).send(horario);
}

export async function getAllHorariosController(request: FastifyRequest, reply: FastifyReply) {
    const horarios = await getAllHorarios();
    return reply.send(horarios);
}

export async function getHorarioByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const horario = await getHorarioById(request.params.id);
    if (!horario) {
        return reply.code(404).send({ message: 'Horário não encontrado' });
    }
    return reply.send(horario);
}

export async function updateHorarioController(request: FastifyRequest<{ Params: { id: number }, Body: UpdateHorarioInput }>, reply: FastifyReply) {
    const horario = await updateHorario(request.params.id, request.body);
    if (!horario) {
        return reply.code(404).send({ message: 'Horário não encontrado' });
    }
    return reply.send(horario);
}

export async function deleteHorarioController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
    const success = await deleteHorario(request.params.id);
    if (!success) {
        return reply.code(404).send({ message: 'Horário não encontrado' });
    }
    return reply.code(204).send();
} 