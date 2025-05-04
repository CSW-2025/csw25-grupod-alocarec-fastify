// user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from './usuario-service';

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const { nome, email } = req.body as { nome: string; email: string };
  const user = await userService.createUser({ nome, email });
  res.status(201).send(user);
}

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const users = await userService.getAllUsers();
  res.send(users);
}
