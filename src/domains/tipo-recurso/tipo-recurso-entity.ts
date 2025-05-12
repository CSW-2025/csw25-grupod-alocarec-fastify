export interface TipoRecurso {
    id: number;
    nome: string;
}

export type CreateTipoRecursoInput = Omit<TipoRecurso, 'id'>;
export type UpdateTipoRecursoInput = Partial<CreateTipoRecursoInput>; 