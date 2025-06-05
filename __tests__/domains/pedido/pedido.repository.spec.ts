import { PrismaClient } from '@prisma/client';
import * as PedidoRepository from '../../../src/domains/pedido/pedido-repository';
import { Pedido, CreatePedidoInput, Status } from '../../../src/domains/pedido/pedido-entity';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    pedido: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe('PedidoRepository', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um pedido com sucesso', async () => {
      const input: CreatePedidoInput = {
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      const mockPedido: Pedido = {
        id: 1,
        ...input,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      (prisma.pedido.create as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.create(input);

      expect(result).toEqual(mockPedido);
      expect(prisma.pedido.create).toHaveBeenCalledWith({
        data: input,
      });
    });

    it('deve propagar erro do banco de dados', async () => {
      const input: CreatePedidoInput = {
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
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
      const mockPedido: Pedido = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      (prisma.pedido.findUnique as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.findById(1);

      expect(result).toEqual(mockPedido);
      expect(prisma.pedido.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve retornar null quando pedido não encontrado', async () => {
      (prisma.pedido.findUnique as jest.Mock).mockResolvedValueOnce(null);

      const result = await PedidoRepository.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('deve atualizar um pedido com sucesso', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      const mockPedido: Pedido = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.APROVADA,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      (prisma.pedido.update as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.update(1, updateInput);

      expect(result).toEqual(mockPedido);
      expect(prisma.pedido.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateInput,
      });
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
    it('deve deletar um pedido com sucesso', async () => {
      const mockPedido: Pedido = {
        id: 1,
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      };

      (prisma.pedido.delete as jest.Mock).mockResolvedValueOnce(mockPedido);

      const result = await PedidoRepository.remove(1);

      expect(result).toEqual(mockPedido);
      expect(prisma.pedido.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('deve propagar erro quando pedido não encontrado', async () => {
      (prisma.pedido.delete as jest.Mock).mockRejectedValueOnce(new Error('Record to delete does not exist'));

      await expect(PedidoRepository.remove(999))
        .rejects
        .toThrow('Record to delete does not exist');
    });
  });
}); 