// user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from './usuario-service';
import { CreateUsuarioInput, UpdateUsuarioInput } from './usuario-entity';

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const { nome, email, senha, tipo = 'usuario' } = req.body as CreateUsuarioInput;
  const user = await userService.createUser({ nome, email, senha, tipo, ativo: true });
  res.status(201).send(user);
}

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const users = await userService.getAllUsers();
  res.send(users);
}

export async function getUserById(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const user = await userService.getUserById(parseInt(id));
  if (!user) {
    res.status(404).send({ message: 'Usuário não encontrado' });
    return;
  }
  res.send(user);
}

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const updateData = req.body as UpdateUsuarioInput;
  const user = await userService.updateUser(parseInt(id), updateData);
  if (!user) {
    res.status(404).send({ message: 'Usuário não encontrado' });
    return;
  }
  res.send(user);
}

export async function deleteUser(req: FastifyRequest, res: FastifyReply) {
  const { id } = req.params as { id: string };
  const success = await userService.deleteUser(parseInt(id));
  if (!success) {
    res.status(404).send({ message: 'Usuário não encontrado' });
    return;
  }
  res.status(204).send();
}
