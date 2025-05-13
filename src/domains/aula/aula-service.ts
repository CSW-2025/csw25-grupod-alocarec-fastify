import { AulaRepository } from './aula-repository';
import { Aula } from './aula-entity';

const aulaRepository = new AulaRepository();

function toAula(aula: any): Aula {
  return {
    ...aula,
    data_inicio: aula.data_inicio instanceof Date ? aula.data_inicio.toISOString() : aula.data_inicio,
    data_fim: aula.data_fim instanceof Date ? aula.data_fim.toISOString() : aula.data_fim,
    createdAt: aula.createdAt,
    updatedAt: aula.updatedAt,
  };
}

export async function createAula(data: any): Promise<Aula> {
  const aula = await aulaRepository.create(data);
  return toAula(aula);
}

export async function getAllAulas(): Promise<Aula[]> {
  const aulas = await aulaRepository.findAll();
  return aulas.map(toAula);
}

export async function getAulaById(id: number): Promise<Aula | null> {
  const aula = await aulaRepository.findById(id);
  return aula ? toAula(aula) : null;
}

export async function updateAula(id: number, data: any): Promise<Aula> {
  const aula = await aulaRepository.update(id, data);
  return toAula(aula);
}

export async function deleteAula(id: number): Promise<void> {
  await aulaRepository.delete(id);
}
