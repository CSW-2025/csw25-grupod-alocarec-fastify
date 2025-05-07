// user.service.ts
import * as userRepository from './usuario-repository';
import { Usuario } from './usuario-entity';

type CreateUserData = Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>;

export function createUser(data: CreateUserData) {
  return userRepository.createUser(data);
}

export function getAllUsers(): Promise<Usuario[]> {
  return userRepository.getAllUsers();
}

export function getUserById(id: number): Promise<Usuario | null> {
  return userRepository.getUserById(id);
}

export function updateUser(id: number, data: Partial<CreateUserData>): Promise<Usuario | null> {
  return userRepository.updateUser(id, data);
}

export function deleteUser(id: number): Promise<boolean> {
  return userRepository.deleteUser(id);
}
