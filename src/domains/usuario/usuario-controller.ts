// user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import * as userService from './usuario-service';
import { CreateUsuarioInput, UpdateUsuarioInput } from './usuario-entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/jwt';

export async function createUser(req: FastifyRequest, res: FastifyReply) {
  const { nome, email, dataNascimento, sexo, telefones, perfilId, senha } = req.body as any;
  // telefones deve ser um array de objetos { numero, descricao }
  const user = await userService.createUser({ nome, email, dataNascimento, sexo, telefones, perfilId, senha });
  res.status(201).send(user);
}

export async function getAllUsers(req: FastifyRequest, res: FastifyReply) {
  const users = await userService.getAllUsers();
  res.send(users);
}

export async function getUserById(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const user = await userService.getUserById(parseInt(id));
    if (!user) {
      res.status(404).send({ message: 'Usuário não encontrado' });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao buscar o usuário.'
    });
  }
}

export async function updateUser(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params as { id: string };
    const updateData = req.body as UpdateUsuarioInput;
    const user = await userService.updateUser(parseInt(id), updateData);
    if (!user) {
      res.status(404).send({ message: 'Usuário não encontrado' });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Ocorreu um erro inesperado ao atualizar o usuário.'
    });
  }
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

export async function login(req: FastifyRequest, res: FastifyReply) {
  const { email, senha } = req.body as { email: string; senha: string };
  if (!email || !senha) {
    return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
  }
  const user = await userService.getUserByEmail(email);
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
