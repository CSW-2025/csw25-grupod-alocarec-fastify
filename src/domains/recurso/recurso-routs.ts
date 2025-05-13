import { FastifyInstance } from 'fastify';
import {
  createRecursoController,
  getAllRecursosController,
  getRecursoByIdController,
  updateRecursoController,
  deleteRecursoController,
} from './recurso-controller';

export default async function recursoRoutes(app: FastifyInstance) {
  app.post('/', createRecursoController);
  app.get('/', getAllRecursosController);
  app.get('/:id', getRecursoByIdController);
  app.put('/:id', updateRecursoController);
  app.delete('/:id', deleteRecursoController);
}
