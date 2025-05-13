import { DisciplinaCurriculo } from '../disciplina-curriculo/disciplina-curriculo-entity';

export interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  creditos: number;
  carga_horaria: number;
  ementa?: string;
  createdAt: Date;
  updatedAt: Date;
  curriculos?: readonly DisciplinaCurriculo[];
}

export type CreateDisciplinaInput = Omit<Disciplina, 'id' | 'createdAt' | 'updatedAt' | 'curriculos'>;
export type UpdateDisciplinaInput = Partial<CreateDisciplinaInput>;
