import { FastifyInstance } from 'fastify';
import { createCurriculoController, getAllCurriculosController, getCurriculoByIdController, updateCurriculoController, deleteCurriculoController } from './curriculo-controller';

const disciplinaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    disciplina_id: { type: 'number' },
    curriculo_id: { type: 'number' },
    semestre: { type: 'string' },
    disciplina: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        nome: { type: 'string' },
        codigo: { type: 'string' },
        creditos: { type: 'number' },
        carga_horaria: { type: 'number' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

const curriculoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome_curso: { type: 'string' },
    semestre_inicio_vigencia: { type: 'string' },
    semestre_fim_vigencia: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    disciplinas: {
      type: 'array',
      items: disciplinaSchema
    }
  }
};

export default async function curriculoRoutes(fastify: FastifyInstance) {
    fastify.post('/', {
      schema: {
        tags: ['curriculos'],
        summary: 'Criar um novo currículo',
        body: {
          type: 'object',
          required: ['nome_curso', 'semestre_inicio_vigencia', 'semestre_fim_vigencia'],
          properties: {
            nome_curso: { type: 'string' },
            semestre_inicio_vigencia: { type: 'string' },
            semestre_fim_vigencia: { type: 'string' }
          }
        },
        response: {
          201: curriculoSchema
        }
      }
    }, createCurriculoController);

    fastify.get('/', {
      schema: {
        tags: ['curriculos'],
        summary: 'Listar todos os currículos',
        response: {
          200: {
            type: 'array',
            items: curriculoSchema
          }
        }
      }
    }, getAllCurriculosController);

    fastify.get('/:id', {
      schema: {
        tags: ['curriculos'],
        summary: 'Buscar currículo por ID',
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: curriculoSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, getCurriculoByIdController);

    fastify.put('/:id', {
      schema: {
        tags: ['curriculos'],
        summary: 'Atualizar currículo',
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
            nome_curso: { type: 'string' },
            semestre_inicio_vigencia: { type: 'string' },
            semestre_fim_vigencia: { type: 'string' }
          }
        },
        response: {
          200: curriculoSchema,
          404: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    }, updateCurriculoController);

    fastify.delete('/:id', {
      schema: {
        tags: ['curriculos'],
        summary: 'Deletar currículo',
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
    }, deleteCurriculoController);
} 