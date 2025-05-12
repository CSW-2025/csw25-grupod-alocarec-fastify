export interface Turma {
    id: number;
    numero: string;
    semestre: string;
    professor_id: number;
    vagas: number;
    disciplina_id?: number;
}

export type CreateTurmaInput = Omit<Turma, 'id'>;
export type UpdateTurmaInput = Partial<CreateTurmaInput>; 