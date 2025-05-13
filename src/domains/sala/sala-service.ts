import * as salaRepository from './sala-repository';
import { Sala, CreateSalaInput, UpdateSalaInput } from './sala-entity';

export function createSala(data: CreateSalaInput) {
  return salaRepository.createSala(data);
}

export function getAllSalas(): Promise<Sala[]> {
  return salaRepository.findAllSalas();
}

export function getSalaById(id: number): Promise<Sala | null> {
  return salaRepository.findSalaById(id);
}

export function updateSala(id: number, data: UpdateSalaInput): Promise<Sala | null> {
  return salaRepository.updateSala(id, data);
}

export function deleteSala(id: number): Promise<boolean> {
  return salaRepository.deleteSala(id);
} 