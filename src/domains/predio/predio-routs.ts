import { FastifyInstance } from 'fastify';
import {
  createPredioController,
  getAllPrediosController,
  getPredioByIdController,
  updatePredioController,
  deletePredioController,
} from './predio-controller';

export default async function predioRoutes(app: FastifyInstance) {
  app.post('/', {
    schema: {
      tags: ['prédios'],
      summary: 'Criar um novo prédio'
    }
  }, createPredioController);

  app.get('/', {
    schema: {
      tags: ['prédios'],
      summary: 'Listar todos os prédios'
    }
  }, getAllPrediosController);

  app.get('/:id', {
    schema: {
      tags: ['prédios'],
      summary: 'Buscar prédio por ID'
    }
  }, getPredioByIdController);

  app.put('/:id', {
    schema: {
      tags: ['prédios'],
      summary: 'Atualizar prédio'
    }
  }, updatePredioController);

  app.delete('/:id', {
    schema: {
      tags: ['prédios'],
      summary: 'Deletar prédio'
    }
  }, deletePredioController);
}
