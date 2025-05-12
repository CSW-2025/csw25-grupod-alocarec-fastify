export interface Requisito {
    id: number;
    tipo: string;
    disciplina_id: number;
}

export type CreateRequisitoInput = Omit<Requisito, 'id'>;
export type UpdateRequisitoInput = Partial<CreateRequisitoInput>; 