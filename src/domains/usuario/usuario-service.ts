// user.service.ts
import * as userRepository from './usuario-repository';
import { Usuario, CreateUsuarioInput } from './usuario-entity';

export function createUser(data: CreateUsuarioInput) {
  return userRepository.createUser(data);
}

export function getAllUsers(): Promise<Usuario[]> {
  return userRepository.getAllUsers();
}

export function getUserById(id: number): Promise<Usuario | null> {
  return userRepository.getUserById(id);
}

export function updateUser(id: number, data: Partial<CreateUsuarioInput>): Promise<Usuario | null> {
  return userRepository.updateUser(id, data);
}

export function deleteUser(id: number): Promise<boolean> {
  return userRepository.deleteUser(id);
}
