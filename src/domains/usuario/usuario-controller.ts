// user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserService, getAllUsersService, getUserByIdService, updateUserService, deleteUserService, getUserByEmail } from './usuario-service';
import { CreateUsuarioInput, UpdateUsuarioInput } from './usuario-entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt';

export async function createUserController(req: FastifyRequest<{ Body: CreateUsuarioInput }>, res: FastifyReply) {
  const user = await createUserService(req.body);
  res.status(201).send(user);
}

export async function getAllUsersController(req: FastifyRequest, res: FastifyReply) {
  const users = await getAllUsersService();
  res.send(users);
}

export async function getUserByIdController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  const user = await getUserByIdService(req.params.id);
  res.send(user);
}

export async function updateUserController(req: FastifyRequest<{ Params: { id: number }, Body: UpdateUsuarioInput }>, res: FastifyReply) {
  const user = await updateUserService(req.params.id, req.body);
  res.send(user);
}

export async function deleteUserController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  await deleteUserService(req.params.id);
  res.status(204).send();
}

export async function login(req: FastifyRequest, res: FastifyReply) {
  const { email, senha } = req.body as { email: string; senha: string };
  if (!email || !senha) {
    return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
  }
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).send({ message: 'Usuário ou senha inválidos.' });
  }
  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    return res.status(401).send({ message: 'Usuário ou senha inválidos.' });
  }
  // Não incluir a senha no payload do token
  const { senha: _, ...userPayload } = user;
  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: '1h' });
  return res.send({ token });
}

export { 
  createUserController as createUser,
  getAllUsersController as getAllUsers,
  getUserByIdController as getUserById,
  updateUserController as updateUser,
  deleteUserController as deleteUser
};
