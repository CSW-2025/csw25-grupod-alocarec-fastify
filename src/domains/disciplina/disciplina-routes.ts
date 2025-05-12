import { FastifyInstance } from 'fastify';
import {
  createDisciplina,
  getAllDisciplinas,
  getDisciplinaById,
  updateDisciplina,
  deleteDisciplina,
} from './disciplina-controller';

const curriculoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    curriculo_id: { type: 'number' },
    disciplina_id: { type: 'number' },
    semestre: { type: 'string' },
    curriculo: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        nome_curso: { type: 'string' },
        semestre_inicio_vigencia: { type: 'string' },
        semestre_fim_vigencia: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' }
      }
    }
  }
};

const disciplinaSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    nome: { type: 'string' },
    codigo: { type: 'string' },
    creditos: { type: 'number' },
    carga_horaria: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
    curriculos: {
      type: 'array',
      items: curriculoSchema
    }
  }
};

export default async function disciplinaRoutes(fastify: FastifyInstance) {
  fastify.post('/', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Criar uma nova disciplina',
      body: {
        type: 'object',
        required: ['nome', 'codigo', 'creditos', 'carga_horaria'],
        properties: {
          nome: { type: 'string' },
          codigo: { type: 'string' },
          creditos: { type: 'number' },
          carga_horaria: { type: 'number' }
        }
      },
      response: { 201: disciplinaSchema }
    }
  }, createDisciplina);

  fastify.get('/', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Listar todas as disciplinas',
      response: {
        200: {
          type: 'array',
          items: disciplinaSchema
        }
      }
    }
  }, getAllDisciplinas);

  fastify.get('/:id', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Buscar disciplina por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        200: disciplinaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, getDisciplinaById);

  fastify.put('/:id', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Atualizar disciplina',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          codigo: { type: 'string' },
          creditos: { type: 'number' },
          carga_horaria: { type: 'number' }
        }
      },
      response: {
        200: disciplinaSchema,
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, updateDisciplina);

  fastify.delete('/:id', {
    schema: {
      tags: ['disciplinas'],
      summary: 'Deletar disciplina',
      params: {
        type: 'object',
        required: ['id'],
        properties: { id: { type: 'string' } }
      },
      response: {
        204: { type: 'null' },
        404: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }, deleteDisciplina);
}
