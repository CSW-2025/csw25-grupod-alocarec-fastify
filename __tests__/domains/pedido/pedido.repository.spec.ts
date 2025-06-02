import { PrismaClient } from '@prisma/client';
import * as PedidoRepository from '../../../src/domains/pedido/pedido-repository';
import { prisma } from '../../../src/config/database';
import { Status } from '../../../src/domains/pedido/pedido-schema';
import { CreatePedidoInput } from '../../../src/domains/pedido/pedido-entity';

// Mock do Prisma
jest.mock('../../../src/config/database', () => ({
  prisma: {
    pedido: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }
}));

describe('PedidoRepository', () => {
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

  describe('create', () => {
    it('deve criar um pedido no banco de dados', async () => {
      const input: CreatePedidoInput = {
        nome: 'Pedido de Teste',
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      (prisma.pedido.create as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.create(input);

      expect(prisma.pedido.create).toHaveBeenCalledWith({
        data: input
      });
      expect(result).toEqual(mockPedido);
    });

    it('deve propagar erro do banco de dados', async () => {
      const input: CreatePedidoInput = {
        nome: 'Pedido de Teste',
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      const error = new Error('Erro do banco de dados');
      (prisma.pedido.create as jest.Mock).mockRejectedValueOnce(error);

      await expect(PedidoRepository.create(input)).rejects.toThrow('Erro do banco de dados');
    });
  });

  describe('findById', () => {
    it('deve encontrar um pedido pelo ID', async () => {
      (prisma.pedido.findUnique as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.findById(1);

      expect(prisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockPedido);
    });

    it('deve retornar null quando pedido não existe', async () => {
      (prisma.pedido.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const result = await PedidoRepository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('deve atualizar um pedido existente', async () => {
      const updateData = {
        status: Status.APROVADA
      };

      const updatedPedido = { ...mockPedido, ...updateData };
      (prisma.pedido.update as jest.Mock).mockResolvedValueOnce(updatedPedido);

      const result = await PedidoRepository.update(1, updateData);

      expect(prisma.pedido.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData
      });
      expect(result).toEqual(updatedPedido);
    });

    it('deve propagar erro quando pedido não existe', async () => {
      const error = new Error('Registro não encontrado');
      (prisma.pedido.update as jest.Mock).mockRejectedValueOnce(error);

      await expect(PedidoRepository.update(999, { status: Status.APROVADA }))
        .rejects
        .toThrow('Registro não encontrado');
    });
  });

  describe('remove', () => {
    it('deve remover um pedido existente', async () => {
      (prisma.pedido.delete as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.remove(1);

      expect(prisma.pedido.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockPedido);
    });

    it('deve propagar erro quando pedido não existe', async () => {
      const error = new Error('Registro não encontrado');
      (prisma.pedido.delete as jest.Mock).mockRejectedValueOnce(error);

      await expect(PedidoRepository.remove(999))
        .rejects
        .toThrow('Registro não encontrado');
    });
  });
}); 