import { FastifyInstance } from 'fastify';
import {
  createPredioController,
  getAllPrediosController,
  getPredioByIdController,
  updatePredioController,
  deletePredioController,
} from './predio-controller';

export default async function predioRoutes(app: FastifyInstance) {
  app.post('/', createPredioController);
  app.get('/', getAllPrediosController);
  app.get('/:id', getPredioByIdController);
  app.put('/:id', updatePredioController);
  app.delete('/:id', deletePredioController);
}
