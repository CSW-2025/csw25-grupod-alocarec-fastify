import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatePerfilInput, UpdatePerfilInput } from './perfil-entity';
import { createPerfilService, getAllPerfisService, getPerfilByIdService, updatePerfilService, deletePerfilService } from './perfil-service';

export async function createPerfilController(request: FastifyRequest<{ Body: CreatePerfilInput }>, reply: FastifyReply) {
  const perfil = await createPerfilService(request.body);
  return reply.code(201).send(perfil);
}

export async function getAllPerfisController(request: FastifyRequest, reply: FastifyReply) {
  const perfis = await getAllPerfisService();
  return reply.send(perfis);
}

export async function getPerfilByIdController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  const perfil = await getPerfilByIdService(request.params.id);
  return reply.send(perfil);
}

export async function updatePerfilController(request: FastifyRequest<{ Params: { id: number }, Body: UpdatePerfilInput }>, reply: FastifyReply) {
  const perfil = await updatePerfilService(request.params.id, request.body);
  return reply.send(perfil);
}

export async function deletePerfilController(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
  await deletePerfilService(request.params.id);
  return reply.code(204).send();
} 