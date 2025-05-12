import { Disciplina, CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import * as repository from './disciplina-repository';

function toDisciplina(disciplina: any): Disciplina {
  return {
    ...disciplina,
    createdAt: disciplina.createdAt ? disciplina.createdAt.toISOString() : '',
    updatedAt: disciplina.updatedAt ? disciplina.updatedAt.toISOString() : '',
  };
}

export async function createDisciplinaService(data: CreateDisciplinaInput): Promise<Disciplina> {
  const disciplina = await repository.create(data);
  return toDisciplina(disciplina);
}

export async function getAllDisciplinasService(): Promise<Disciplina[]> {
  const disciplinas = await repository.findAll();
  return disciplinas.map(toDisciplina);
}

export async function getDisciplinaByIdService(id: number): Promise<Disciplina | null> {
  const disciplina = await repository.findById(id);
  return disciplina ? toDisciplina(disciplina) : null;
}

export async function updateDisciplinaService(id: number, data: UpdateDisciplinaInput): Promise<Disciplina | null> {
  const existing = await repository.findById(id);
  if (!existing) return null;

  const disciplina = await repository.update(id, data);
  return disciplina ? toDisciplina(disciplina) : null;
}

export async function deleteDisciplinaService(id: number): Promise<boolean> {
  const deleted = await repository.remove(id);
  return !!deleted;
}
