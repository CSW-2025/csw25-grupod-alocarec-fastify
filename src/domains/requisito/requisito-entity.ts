export interface Requisito {
    id: number;
    tipo: string;
    disciplina_id: number;
    disciplina?: any;
}

export type CreateRequisitoInput = Omit<Requisito, 'id'>;
export type UpdateRequisitoInput = Partial<CreateRequisitoInput>; 