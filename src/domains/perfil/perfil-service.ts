import { Perfil, CreatePerfilInput, UpdatePerfilInput } from './perfil-entity';
import * as perfilRepository from './perfil-repository';

export function createPerfil(data: CreatePerfilInput): Promise<Perfil> {
  return perfilRepository.createPerfil(data);
}

export function getAllPerfis(): Promise<Perfil[]> {
  return perfilRepository.getAllPerfis();
}

export function getPerfilById(id: number): Promise<Perfil | null> {
  return perfilRepository.getPerfilById(id);
}

export function updatePerfil(id: number, data: UpdatePerfilInput): Promise<Perfil | null> {
  return perfilRepository.updatePerfil(id, data);
}

export function deletePerfil(id: number): Promise<boolean> {
  return perfilRepository.deletePerfil(id);
} 