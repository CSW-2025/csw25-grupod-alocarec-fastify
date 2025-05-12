import { FastifyInstance } from 'fastify';
import { createDisciplinaCurriculoController, getAllDisciplinaCurriculosController, getDisciplinaCurriculoByIdController, updateDisciplinaCurriculoController, deleteDisciplinaCurriculoController } from './disciplina-curriculo-controller';

const disciplinaCurriculoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    disciplina_id: { type: 'number' },
    curriculo_id: { type: 'number' },
    semestre: { type: 'string' }
  }
};

export default async function disciplinaCurriculoRoutes(fastify: FastifyInstance) {
    fastify.post('/', {
      schema: {
        tags: ['disciplina-curriculo'],
        summary: 'Criar um novo DisciplinaCurriculo',
        body: {
          type: 'object',
          required: ['disciplina_id', 'curriculo_id', 'semestre'],
          properties: {
            disciplina_id: { type: 'number' },
            curriculo_id: { type: 'number' },
            semestre: { type: 'string' }
          }
        },
        response: {
          201: disciplinaCurriculoSchema
        }
      }
    }, createDisciplinaCurriculoController);

    fastify.get('/', {
      schema: {
        tags: ['disciplina-curriculo'],
        summary: 'Listar todos os DisciplinaCurriculos',
        response: {
          200: {
            type: 'array',
            items: disciplinaCurriculoSchema
          }
        }
      }
    }, getAllDisciplinaCurriculosController);

    fastify.get('/:id', {
      schema: {
        tags: ['disciplina-curriculo'],
        summary: 'Buscar DisciplinaCurriculo por ID',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: disciplinaCurriculoSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, getDisciplinaCurriculoByIdController);

    fastify.put('/:id', {
      schema: {
        tags: ['disciplina-curriculo'],
        summary: 'Atualizar DisciplinaCurriculo',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        body: {
          type: 'object',
          properties: {
            disciplina_id: { type: 'number' },
            curriculo_id: { type: 'number' },
            semestre: { type: 'string' }
          }
        },
        response: {
          200: disciplinaCurriculoSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, updateDisciplinaCurriculoController);

    fastify.delete('/:id', {
      schema: {
        tags: ['disciplina-curriculo'],
        summary: 'Deletar DisciplinaCurriculo',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          204: { type: 'null' },
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, deleteDisciplinaCurriculoController);
} 