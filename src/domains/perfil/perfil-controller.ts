import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePerfilInput, UpdatePerfilInput } from './perfil-entity';
import * as perfilService from './perfil-service';

export async function createPerfilController(request: FastifyRequest<{ Body: CreatePerfilInput }>, reply: FastifyReply) {
  const perfil = await perfilService.createPerfil(request.body);
  return reply.code(201).send(perfil);
}

export async function getAllPerfisController(request: FastifyRequest, reply: FastifyReply) {
  const perfis = await perfilService.getAllPerfis();
  return reply.send(perfis);
}

export async function getPerfilByIdController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const perfil = await perfilService.getPerfilById(parseInt(request.params.id));
  if (!perfil) {
    return reply.code(404).send({ message: 'Perfil não encontrado' });
  }
  return reply.send(perfil);
}

export async function updatePerfilController(request: FastifyRequest<{ Params: { id: string }, Body: UpdatePerfilInput }>, reply: FastifyReply) {
  const perfil = await perfilService.updatePerfil(parseInt(request.params.id), request.body);
  if (!perfil) {
    return reply.code(404).send({ message: 'Perfil não encontrado' });
  }
  return reply.send(perfil);
}

export async function deletePerfilController(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const success = await perfilService.deletePerfil(parseInt(request.params.id));
  if (!success) {
    return reply.code(404).send({ message: 'Perfil não encontrado' });
  }
  return reply.code(204).send();
} 