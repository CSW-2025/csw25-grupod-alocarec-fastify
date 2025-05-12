export interface DisciplinaCurriculo {
    id: number;
    disciplina_id: number;
    curriculo_id: number;
    semestre: string;
    created_at?: Date;
    updated_at?: Date;
}

export type CreateDisciplinaCurriculoInput = Omit<DisciplinaCurriculo, 'id' | 'created_at' | 'updated_at'>;
export type UpdateDisciplinaCurriculoInput = Partial<CreateDisciplinaCurriculoInput>; 