import { Disciplina, CreateDisciplinaInput, UpdateDisciplinaInput } from './disciplina-entity';
import * as repository from './disciplina-repository';

export async function createDisciplina(data: CreateDisciplinaInput): Promise<Disciplina> {
  return await repository.create(data);
}

export async function getAllDisciplinas(): Promise<Disciplina[]> {
  return await repository.findAll();
}

export async function getDisciplinaById(id: number): Promise<Disciplina | null> {
  return await repository.findById(id);
}

export async function updateDisciplina(id: number, data: UpdateDisciplinaInput): Promise<Disciplina | null> {
  const existing = await repository.findById(id);
  if (!existing) return null;

  return await repository.update(id, data);
}

export async function deleteDisciplina(id: number): Promise<void> {
  await repository.remove(id);
}
