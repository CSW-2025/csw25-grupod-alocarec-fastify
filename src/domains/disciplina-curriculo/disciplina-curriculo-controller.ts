import { FastifyRequest, FastifyReply } from 'fastify';
import { DisciplinaCurriculoService } from './disciplina-curriculo-service';
import { DisciplinaCurriculo } from './disciplina-curriculo-entity';

const disciplinaCurriculoService = new DisciplinaCurriculoService();

export async function createDisciplinaCurriculoController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const disciplinaCurriculo = await disciplinaCurriculoService.create(request.body as DisciplinaCurriculo);
        reply.code(201).send(disciplinaCurriculo);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao criar disciplina-curriculo' });
    }
}

export async function getAllDisciplinaCurriculosController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const disciplinasCurriculo = await disciplinaCurriculoService.findAll();
        reply.send(disciplinasCurriculo);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao buscar disciplinas-curriculo' });
    }
}

export async function getDisciplinaCurriculoByIdController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const disciplinaCurriculo = await disciplinaCurriculoService.findById(parseInt(request.params.id));
        if (!disciplinaCurriculo) {
            reply.code(404).send({ error: 'Disciplina-curriculo não encontrada' });
            return;
        }
        reply.send(disciplinaCurriculo);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao buscar disciplina-curriculo' });
    }
}

export async function updateDisciplinaCurriculoController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const disciplinaCurriculo = await disciplinaCurriculoService.update(parseInt(request.params.id), request.body as DisciplinaCurriculo);
        if (!disciplinaCurriculo) {
            reply.code(404).send({ error: 'Disciplina-curriculo não encontrada' });
            return;
        }
        reply.send(disciplinaCurriculo);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao atualizar disciplina-curriculo' });
    }
}

export async function deleteDisciplinaCurriculoController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
        const disciplinaCurriculo = await disciplinaCurriculoService.delete(parseInt(request.params.id));
        if (!disciplinaCurriculo) {
            reply.code(404).send({ error: 'Disciplina-curriculo não encontrada' });
            return;
        }
        reply.send(disciplinaCurriculo);
    } catch (error) {
        reply.code(500).send({ error: 'Erro ao deletar disciplina-curriculo' });
    }
} 