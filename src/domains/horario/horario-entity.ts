export interface Horario {
    id: number;
    dia_semana: string;
    horario: string;
    turma_id: number;
}

export type CreateHorarioInput = Omit<Horario, 'id'>;
export type UpdateHorarioInput = Partial<CreateHorarioInput>; 