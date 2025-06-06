import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as UsuarioService from '../../../src/domains/usuario/usuario-service';
import { UsuarioResponseDTO } from '../../../src/domains/usuario/dto/UsuarioResponseDTO';
import { Sexo } from '../../../src/domains/usuario/usuario-entity';

jest.mock('../../../src/domains/usuario/usuario-service');
// Mock do JWT para sempre retornar admin
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({
    id: 1,
    email: 'admin@admin.com',
    nome: 'Administrador',
    perfil: { id: 1, nome: 'Admin' }
  }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('UsuarioController (mockado)', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await build();
  });

  describe('POST /usuarios', () => {
    it('deve criar um usuário com sucesso', async () => {
      const mockUsuario: UsuarioResponseDTO = {
        id: 1,
        email: 'teste@example.com',
        nome: 'Usuario Teste',
        dataNascimento: '2024-01-01T00:00:00.000Z',
        sexo: Sexo.M,
        perfilId: 1,
        perfil: { id: 1, nome: 'Admin' },
        telefones: [{ id: 1, numero: '123456789', descricao: 'celular' }]
      };
      const input = {
        email: 'teste@example.com',
        nome: 'Usuario Teste',
        dataNascimento: '2024-01-01T00:00:00.000Z',
        sexo: Sexo.M,
        perfilId: 1,
        senha: 'senha123',
        telefones: [{ numero: '123456789', descricao: 'celular' }]
      };
      (UsuarioService.createUserService as jest.Mock).mockResolvedValueOnce(mockUsuario);
      const response = await app.inject({
        method: 'POST',
        url: '/usuarios',
        payload: input,
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toEqual(mockUsuario);
    });
    it('deve retornar 400 para dados inválidos', async () => {
      const invalidInput = {
        nome: 'Usuario Teste',
        // email faltando
        dataNascimento: '2024-01-01T00:00:00.000Z',
        sexo: Sexo.M,
        perfilId: 1,
        senha: 'senha123',
        telefones: [{ numero: '123456789', descricao: 'celular' }]
      };
      const response = await app.inject({
        method: 'POST',
        url: '/usuarios',
        payload: invalidInput,
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /usuarios', () => {
    it('deve retornar todos os usuários', async () => {
      const mockUsuarios = [
        {
          id: 1,
          nome: 'Usuario Teste',
          email: 'teste@example.com'
        }
      ];
      (UsuarioService.getAllUsersService as jest.Mock).mockResolvedValueOnce(mockUsuarios);
      const response = await app.inject({
        method: 'GET',
        url: '/usuarios'
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockUsuarios);
    });
  });

  describe('GET /usuarios/:id', () => {
    it('deve retornar um usuário pelo ID', async () => {
      const mockUsuario: UsuarioResponseDTO = {
        id: 1,
        email: 'teste@example.com',
        nome: 'Usuario Teste',
        dataNascimento: '2024-01-01T00:00:00.000Z',
        sexo: Sexo.M,
        perfilId: 1,
        perfil: { id: 1, nome: 'Admin' },
        telefones: [{ id: 1, numero: '123456789', descricao: 'celular' }]
      };
      (UsuarioService.getUserByIdService as jest.Mock).mockResolvedValueOnce(mockUsuario);
      const response = await app.inject({
        method: 'GET',
        url: '/usuarios/1'
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockUsuario);
    });
    it('deve retornar 404 para usuário não encontrado', async () => {
      const notFoundError = new Error('Usuário não encontrado');
      (notFoundError as any).statusCode = 404;
      (UsuarioService.getUserByIdService as jest.Mock).mockRejectedValueOnce(notFoundError);
      const response = await app.inject({
        method: 'GET',
        url: '/usuarios/999'
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /usuarios/:id', () => {
    it('deve atualizar um usuário com sucesso', async () => {
      const updateInput = { nome: 'Novo Nome' };
      const mockUsuario: UsuarioResponseDTO = {
        id: 1,
        email: 'teste@example.com',
        nome: 'Novo Nome',
        dataNascimento: '2024-01-01T00:00:00.000Z',
        sexo: Sexo.M,
        perfilId: 1,
        perfil: { id: 1, nome: 'Admin' },
        telefones: [{ id: 1, numero: '123456789', descricao: 'celular' }]
      };
      (UsuarioService.updateUserService as jest.Mock).mockResolvedValueOnce(mockUsuario);
      const response = await app.inject({
        method: 'PUT',
        url: '/usuarios/1',
        payload: updateInput,
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockUsuario);
    });
    it('deve retornar 404 para usuário não encontrado', async () => {
      const updateInput = { nome: 'Novo Nome' };
      const notFoundError = new Error('Usuário não encontrado');
      (notFoundError as any).statusCode = 404;
      (UsuarioService.updateUserService as jest.Mock).mockRejectedValueOnce(notFoundError);
      const response = await app.inject({
        method: 'PUT',
        url: '/usuarios/999',
        payload: updateInput,
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /usuarios/:id', () => {
    it('deve deletar um usuário com sucesso', async () => {
      (UsuarioService.deleteUserService as jest.Mock).mockResolvedValueOnce(1);
      const response = await app.inject({
        method: 'DELETE',
        url: '/usuarios/1',
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(204);
    });
    it('deve retornar 404 para usuário não encontrado', async () => {
      const notFoundError = new Error('Usuário não encontrado');
      (notFoundError as any).statusCode = 404;
      (UsuarioService.deleteUserService as jest.Mock).mockRejectedValueOnce(notFoundError);
      const response = await app.inject({
        method: 'DELETE',
        url: '/usuarios/999',
        headers: {
          authorization: 'Bearer fake-admin-token'
        }
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('POST /usuarios/login', () => {
    it('deve autenticar e retornar um token', async () => {
      (UsuarioService.getUserByEmail as jest.Mock).mockResolvedValueOnce({        
        email: 'admin@admin.com',        
        senha: 'admin123'
      });
      // Mock do bcrypt.compare
      jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValueOnce(true);
      // Mock do jwt.sign
      jest.spyOn(require('jsonwebtoken'), 'sign').mockReturnValueOnce('fake-jwt-token');
      const response = await app.inject({
        method: 'POST',
        url: '/usuarios/login',
        payload: { email: 'admin@admin.com', senha: 'admin123' }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual({ token: 'fake-jwt-token' });
    });
    it('deve retornar 401 para credenciais inválidas', async () => {
      (UsuarioService.getUserByEmail as jest.Mock).mockResolvedValueOnce(null);
      const response = await app.inject({
        method: 'POST',
        url: '/usuarios/login',
        payload: { email: 'admin@admin.com', senha: 'admin123' }
      });
      expect(response.statusCode).toBe(401);
    });
  });
}); 