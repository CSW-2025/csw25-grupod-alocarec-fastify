export interface Curriculo {
    id: number;
    nome_curso: string;
    semestre_inicio_vigencia: string;
    semestre_fim_vigencia: string;
}

export type CreateCurriculoInput = Omit<Curriculo, 'id'>;
export type UpdateCurriculoInput = Partial<CreateCurriculoInput>; 