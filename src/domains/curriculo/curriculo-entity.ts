import { DisciplinaCurriculo } from '../disciplina-curriculo/disciplina-curriculo-entity';

export interface Curriculo {
    id: number;
    nome_curso: string;
    semestre_inicio_vigencia: string;
    semestre_fim_vigencia: string;
    createdAt: Date;
    updatedAt: Date;
    disciplinas?: DisciplinaCurriculo[];
}

export type CreateCurriculoInput = Omit<Curriculo, 'id' | 'createdAt' | 'updatedAt' | 'disciplinas'>;
export type UpdateCurriculoInput = Partial<CreateCurriculoInput>; 