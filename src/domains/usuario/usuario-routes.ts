import { FastifyInstance } from 'fastify';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from './usuario-controller';

export default async function usuarioRotas(fastify: FastifyInstance) {
  // Criar usuário
  fastify.post('/', {
    schema: {
      tags: ['usuarios'],
      summary: 'Criar um novo usuário',
      body: {
        type: 'object',
        required: ['nome', 'email', 'dataNascimento', 'sexo', 'perfilId', 'telefones'],
        properties: {
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          dataNascimento: { type: 'string', format: 'date-time' },
          sexo: { type: 'string' },
          perfilId: { type: 'number' },
          telefones: {
            type: 'array',
            items: {
              type: 'object',
              required: ['numero', 'descricao'],
              properties: {
                numero: { type: 'string' },
                descricao: { type: 'string' }
              }
            }
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' },
            dataNascimento: { type: 'string', format: 'date-time' },
            sexo: { type: 'string' },
            perfilId: { type: 'number' },
            perfil: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            },
            telefones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  numero: { type: 'string' },
                  descricao: { type: 'string' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        }
      }
    }
  }, createUser);

  // Listar todos os usuários
  fastify.get('/', {
    schema: {
      tags: ['usuarios'],
      summary: 'Listar todos os usuários',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' },
              email: { type: 'string' },
              tipo: { type: 'string' },
              ativo: { type: 'boolean' },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' }
            }
          }
        }
      }
    }
  }, getAllUsers);

  // Buscar usuário por ID
  fastify.get('/:id', {
    schema: {
      tags: ['usuarios'],
      summary: 'Buscar usuário por ID',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' },
            dataNascimento: { type: 'string', format: 'date-time' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            perfilId: { type: 'number' },
            perfil: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            },
            telefones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  numero: { type: 'string' },
                  descricao: { type: 'string' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, getUserById);

  // Atualizar usuário
  fastify.put('/:id', {
    schema: {
      tags: ['usuarios'],
      summary: 'Atualizar um usuário',
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
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          senha: { type: 'string' },
          tipo: { type: 'string', enum: ['usuario', 'admin', 'professor', 'aluno'] },
          ativo: { type: 'boolean' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' },
            dataNascimento: { type: 'string', format: 'date-time' },
            sexo: { type: 'string', enum: ['M', 'F'] },
            perfilId: { type: 'number' },
            perfil: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                nome: { type: 'string' }
              }
            },
            telefones: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  numero: { type: 'string' },
                  descricao: { type: 'string' }
                }
              }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, updateUser);

  // Deletar usuário
  fastify.delete('/:id', {
    schema: {
      tags: ['usuarios'],
      summary: 'Deletar um usuário',
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: {
          type: 'null'
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, deleteUser);
}
