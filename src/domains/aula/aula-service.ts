import { Aula, CreateAulaInput, UpdateAulaInput } from './aula-entity';
import * as repository from './aula-repository';

function toAula(aula: any): Aula {
  const format = (date: Date) => date ? date.toLocaleString('pt-BR', { timeZone: 'UTC', hour12: false }).replace(',', '') : '';
  return {
    ...aula,
    data_inicio: aula.data_inicio ? format(aula.data_inicio) : '',
    data_fim: aula.data_fim ? format(aula.data_fim) : '',
    createdAt: aula.createdAt ? format(aula.createdAt) : '',
    updatedAt: aula.updatedAt ? format(aula.updatedAt) : '',
  };
}

export async function createAula(data: CreateAulaInput): Promise<Aula> {
  const aula = await repository.create(data);
  return toAula(aula);
}

export async function getAllAulas(): Promise<Aula[]> {
  const aulas = await repository.findAll();
  return aulas.map(toAula);
}

export async function getAulaById(id: number): Promise<Aula | null> {
  const aula = await repository.findById(id);
  return aula ? toAula(aula) : null;
}

export async function updateAula(id: number, data: UpdateAulaInput): Promise<Aula | null> {
  const aula = await repository.update(id, data);
  return toAula(aula);
}

export async function deleteAula(id: number): Promise<void> {
  await repository.remove(id);
}
