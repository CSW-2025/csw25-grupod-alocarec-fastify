import { FastifyInstance } from 'fastify';
import {
  createRecursoController,
  getAllRecursosController,
  getRecursoByIdController,
  updateRecursoController,
  deleteRecursoController,
} from './recurso-controller';

export default async function recursoRoutes(app: FastifyInstance) {
  app.post('/', {
    schema: {
      tags: ['recursos'],
      summary: 'Criar um novo recurso'
    }
  }, createRecursoController);

  app.get('/', {
    schema: {
      tags: ['recursos'],
      summary: 'Listar todos os recursos'
    }
  }, getAllRecursosController);

  app.get('/:id', {
    schema: {
      tags: ['recursos'],
      summary: 'Buscar recurso por ID'
    }
  }, getRecursoByIdController);

  app.put('/:id', {
    schema: {
      tags: ['recursos'],
      summary: 'Atualizar recurso'
    }
  }, updateRecursoController);

  app.delete('/:id', {
    schema: {
      tags: ['recursos'],
      summary: 'Deletar recurso'
    }
  }, deleteRecursoController);
}
