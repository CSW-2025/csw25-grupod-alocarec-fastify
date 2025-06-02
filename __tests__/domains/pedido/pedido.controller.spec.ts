import { FastifyInstance } from 'fastify';
import { build } from '@/app';
import * as PedidoService from '../../../src/domains/pedido/pedido-service';
import { Status } from '../../../src/domains/pedido/pedido-schema';

// Mock do módulo de serviço
jest.mock('../../../src/domains/pedido/pedido-service');

describe('PedidoController', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await build();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockPedido = {
    id: 1,
    nome: 'Pedido de Teste',
    aula_id: 1,
    disciplina_id: 2,
    status: Status.PENDENTE,
    moderador_id: null,
    sala_id: null,
    recurso_id: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  describe('POST /pedidos', () => {
    it('deve criar um pedido com sucesso', async () => {
      const input = {
        nome: 'Pedido de Teste',
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      jest.spyOn(PedidoService, 'createPedidoService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'POST',
        url: '/pedidos',
        payload: input
      });

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toEqual(mockPedido);
    });

    it('deve retornar 400 para dados inválidos', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/pedidos',
        payload: {}
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /pedidos/:id', () => {
    it('deve retornar um pedido pelo ID', async () => {
      jest.spyOn(PedidoService, 'getPedidoByIdService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'GET',
        url: '/pedidos/1'
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(mockPedido);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      jest.spyOn(PedidoService, 'getPedidoByIdService').mockRejectedValueOnce(new Error('Pedido não encontrado'));

      const response = await app.inject({
        method: 'GET',
        url: '/pedidos/999'
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /pedidos/:id', () => {
    it('deve atualizar um pedido com sucesso', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      const updatedPedido = { ...mockPedido, ...updateInput };
      jest.spyOn(PedidoService, 'updatePedidoService').mockResolvedValueOnce(updatedPedido);

      const response = await app.inject({
        method: 'PUT',
        url: '/pedidos/1',
        payload: updateInput
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toEqual(updatedPedido);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      jest.spyOn(PedidoService, 'updatePedidoService').mockRejectedValueOnce(new Error('Pedido não encontrado'));

      const response = await app.inject({
        method: 'PUT',
        url: '/pedidos/999',
        payload: { status: Status.APROVADA }
      });

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /pedidos/:id', () => {
    it('deve deletar um pedido com sucesso', async () => {
      jest.spyOn(PedidoService, 'deletePedidoService').mockResolvedValueOnce(mockPedido);

      const response = await app.inject({
        method: 'DELETE',
        url: '/pedidos/1'
      });

      expect(response.statusCode).toBe(204);
    });

    it('deve retornar 404 para pedido não encontrado', async () => {
      jest.spyOn(PedidoService, 'deletePedidoService').mockResolvedValueOnce(null);

      const response = await app.inject({
        method: 'DELETE',
        url: '/pedidos/999'
      });

      expect(response.statusCode).toBe(404);
    });
  });
}); 