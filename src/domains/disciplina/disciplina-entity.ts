export interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  creditos: number;
  carga_horaria: number;
  ementa?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateDisciplinaInput = Omit<Disciplina, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDisciplinaInput = Partial<CreateDisciplinaInput>;
