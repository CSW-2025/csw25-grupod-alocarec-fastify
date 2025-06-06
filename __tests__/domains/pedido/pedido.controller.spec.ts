import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as PedidoService from '../../../src/domains/pedido/pedido-service';
import { PedidoResponseDTO } from '../../../src/domains/pedido/dto/PedidoResponseDTO';
import { Pedido, CreatePedidoInput, Status } from '../../../src/domains/pedido/pedido-entity';

// Mock do módulo de serviço
jest.mock('../../../src/domains/pedido/pedido-service');

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({
    id: 1,
    email: 'admin@admin.com',
    nome: 'Administrador',
    perfil: { id: 1, nome: 'Admin' }
  }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('PedidoController', () => {
  let app: FastifyInstance;
  let token: string;
  
  beforeEach(async () => {
    app = await build();
    const login = await app.inject({
      method: 'POST',
      url: '/usuarios/login',
      payload: { email: 'admin@admin.com', senha: 'admin123' }
    });
    token = JSON.parse(login.payload).token;
  });

   describe('POST /pedidos', () => {
    it('deve criar um pedido com sucesso', async () => {
      const mockPedido: PedidoResponseDTO = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE
      };

      const input: CreatePedidoInput = {
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      jest.spyOn(PedidoService, 'createPedidoService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'POST',
        url: '/pedidos',
        payload: input,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toEqual(mockPedido);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      const invalidInput = {
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        // nome faltando
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      const response = await app.inject({
        method: 'POST',
        url: '/pedidos',
        payload: invalidInput,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /pedidos/:id', () => {
    it('deve retornar um pedido pelo ID', async () => {
      const mockPedido: PedidoResponseDTO = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE
      };

      jest.spyOn(PedidoService, 'getPedidoByIdService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'GET',
        url: '/pedidos/1',
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPedido);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      const notFoundError = new Error('Pedido não encontrado');
      (notFoundError as any).statusCode = 404;
      jest.spyOn(PedidoService, 'getPedidoByIdService').mockRejectedValueOnce(notFoundError);

      const response = await app.inject({
        method: 'GET',
        url: '/pedidos/999',
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /pedidos/:id', () => {
    it('deve atualizar um pedido com sucesso', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      const mockPedido: PedidoResponseDTO = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.APROVADA
      };

      jest.spyOn(PedidoService, 'updatePedidoService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'PUT',
        url: '/pedidos/1',
        payload: updateInput,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPedido);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      const notFoundError = new Error('Pedido não encontrado');
      (notFoundError as any).statusCode = 404;
      jest.spyOn(PedidoService, 'updatePedidoService').mockRejectedValueOnce(notFoundError);

      const response = await app.inject({
        method: 'PUT',
        url: '/pedidos/999',
        payload: updateInput,
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /pedidos/:id', () => {
    it('deve deletar um pedido com sucesso', async () => {
      jest.spyOn(PedidoService, 'deletePedidoService').mockResolvedValueOnce();

      const response = await app.inject({
        method: 'DELETE',
        url: '/pedidos/1',
        headers: {
            authorization:  `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(204);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      const notFoundError = new Error('Pedido não encontrado');
      (notFoundError as any).statusCode = 404;
      jest.spyOn(PedidoService, 'deletePedidoService').mockRejectedValueOnce(notFoundError);

      const response = await app.inject({
        method: 'DELETE',
        url: '/pedidos/999',
        headers: {
            authorization:  `Bearer ${token}`
        }
      });

      expect(response.statusCode).toBe(404);
    });
  });
}); 