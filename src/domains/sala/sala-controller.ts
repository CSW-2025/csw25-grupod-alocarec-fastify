import { FastifyReply, FastifyRequest } from 'fastify';
import { createSalaService, getAllSalasService, getSalaByIdService, updateSalaService, deleteSalaService } from './sala-service';
import { CreateSalaInput, UpdateSalaInput } from './sala-entity';

export async function createSalaController(req: FastifyRequest<{ Body: CreateSalaInput }>, res: FastifyReply) {
  const sala = await createSalaService(req.body);
  res.status(201).send(sala);
}

export async function getAllSalasController(req: FastifyRequest, res: FastifyReply) {
  const salas = await getAllSalasService();
  res.send(salas);
}

export async function getSalaByIdController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  const sala = await getSalaByIdService(req.params.id);
  res.send(sala);
}

export async function updateSalaController(req: FastifyRequest<{ Params: { id: number }, Body: UpdateSalaInput }>, res: FastifyReply) {
  const sala = await updateSalaService(req.params.id, req.body);
  res.send(sala);
}

export async function deleteSalaController(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) {
  await deleteSalaService(req.params.id);
  res.status(204).send();
}

export {
  createSalaController as createSala,
  getAllSalasController as getAllSalas,
  getSalaByIdController as getSalaById,
  updateSalaController as updateSala,
  deleteSalaController as deleteSala
}; 