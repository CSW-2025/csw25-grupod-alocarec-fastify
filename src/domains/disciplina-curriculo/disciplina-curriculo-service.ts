import { DisciplinaCurriculoRepository } from './disciplina-curriculo-repository';
import { DisciplinaCurriculo } from './disciplina-curriculo-entity';

export class DisciplinaCurriculoService {
    private repository: DisciplinaCurriculoRepository;

    constructor() {
        this.repository = new DisciplinaCurriculoRepository();
    }

    async create(disciplinaCurriculo: DisciplinaCurriculo): Promise<DisciplinaCurriculo> {
        return this.repository.create(disciplinaCurriculo);
    }

    async findAll(): Promise<DisciplinaCurriculo[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<DisciplinaCurriculo | null> {
        return this.repository.findById(id);
    }

    async update(id: number, disciplinaCurriculo: DisciplinaCurriculo): Promise<DisciplinaCurriculo | null> {
        return this.repository.update(id, disciplinaCurriculo);
    }

    async delete(id: number): Promise<DisciplinaCurriculo | null> {
        return this.repository.delete(id);
    }
} 