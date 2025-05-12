import { Aula, CreateAulaInput, UpdateAulaInput } from './aula-entity';
import * as repository from './aula-repository';

export async function createAula(data: CreateAulaInput): Promise<Aula> {
  return await repository.create(data);
}

export async function getAllAulas(): Promise<Aula[]> {
  return await repository.findAll();
}

export async function getAulaById(id: number): Promise<Aula | null> {
  return await repository.findById(id);
}

export async function updateAula(id: number, data: UpdateAulaInput): Promise<Aula | null> {
  const existing = await repository.findById(id);
  if (!existing) return null;

  return await repository.update(id, data);
}

export async function deleteAula(id: number): Promise<void> {
  await repository.remove(id);
}
