export interface Curriculo {
    id: number;
    nome_curso: string;
    semestre_inicio_vigencia: string;
    semestre_fim_vigencia: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateCurriculoInput = Omit<Curriculo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCurriculoInput = Partial<CreateCurriculoInput>; 