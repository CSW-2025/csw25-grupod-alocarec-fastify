import { prisma } from '../../config/database';
import { DisciplinaCurriculo } from './disciplina-curriculo-entity';

export class DisciplinaCurriculoRepository {
    async create(disciplinaCurriculo: DisciplinaCurriculo): Promise<DisciplinaCurriculo> {
        return prisma.disciplinaCurriculo.create({
            data: {
                disciplina_id: disciplinaCurriculo.disciplina_id,
                curriculo_id: disciplinaCurriculo.curriculo_id,
                semestre: disciplinaCurriculo.semestre.toString()
            }
        });
    }

    async findAll(): Promise<DisciplinaCurriculo[]> {
        return prisma.disciplinaCurriculo.findMany();
    }

    async findById(id: number): Promise<DisciplinaCurriculo | null> {
        return prisma.disciplinaCurriculo.findUnique({
            where: { id }
        });
    }

    async update(id: number, disciplinaCurriculo: DisciplinaCurriculo): Promise<DisciplinaCurriculo | null> {
        return prisma.disciplinaCurriculo.update({
            where: { id },
            data: {
                disciplina_id: disciplinaCurriculo.disciplina_id,
                curriculo_id: disciplinaCurriculo.curriculo_id,
                semestre: disciplinaCurriculo.semestre.toString()
            }
        });
    }

    async delete(id: number): Promise<DisciplinaCurriculo | null> {
        return prisma.disciplinaCurriculo.delete({
            where: { id }
        });
    }
} 