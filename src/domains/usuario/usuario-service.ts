// user.service.ts
import * as userRepository from './usuario-repository';
import { Usuario } from './usuario-entity';

type CreateUserData = Omit<Usuario, 'id'>;

export function createUser(data: CreateUserData) {
  return userRepository.createUser(data);
}

export function getAllUsers(): Promise<Usuario[]> {
  return userRepository.getAllUsers();
}
