export interface Disciplina {
  id: number;
  nome: string;
  carga_horaria: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateDisciplinaInput = Omit<Disciplina, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDisciplinaInput = Partial<CreateDisciplinaInput>;
