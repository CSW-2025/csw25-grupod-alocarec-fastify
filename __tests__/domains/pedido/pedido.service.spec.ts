import * as PedidoService from '../../../src/domains/pedido/pedido-service';
import * as PedidoRepository from '../../../src/domains/pedido/pedido-repository';
import { CreatePedidoInput, UpdatePedidoInput } from '../../../src/domains/pedido/pedido-entity';

// Definindo o enum Status localmente para os testes
enum Status {
  PENDENTE = 'PENDENTE',
  APROVADA = 'APROVADA',
  REJEITADA = 'REJEITADA'
}

// Mock do módulo de repositório
jest.mock('../../../src/domains/pedido/pedido-repository');

// Mock do módulo de banco de dados
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

describe('PedidoService', () => {
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

  describe('createPedidoService', () => {
    const input: CreatePedidoInput = {
      nome: 'Pedido de Teste',
      aula_id: 1,
      disciplina_id: 2,
      status: Status.PENDENTE,
      moderador_id: null,
      sala_id: null,
      recurso_id: null,
    };

    it('deve criar um pedido com sucesso', async () => {
      jest.spyOn(PedidoRepository, 'create').mockResolvedValueOnce(mockPedido);

      const result = await PedidoService.createPedidoService(input);

      expect(PedidoRepository.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockPedido);
    });

    it('deve lançar erro se a criação falhar', async () => {
      const error = new Error('Erro ao criar pedido');
      jest.spyOn(PedidoRepository, 'create').mockRejectedValueOnce(error);

      await expect(PedidoService.createPedidoService(input))
        .rejects
        .toThrow('Erro ao criar pedido');
    });
  });

  describe('updatePedidoService', () => {
    const updateInput: UpdatePedidoInput = {
      status: Status.APROVADA,
    };

    it('deve atualizar um pedido existente', async () => {
      const updatedPedido = { ...mockPedido, ...updateInput };
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(mockPedido);
      jest.spyOn(PedidoRepository, 'update').mockResolvedValueOnce(updatedPedido);

      const result = await PedidoService.updatePedidoService(mockPedido.id, updateInput);

      expect(PedidoRepository.update).toHaveBeenCalledWith(mockPedido.id, updateInput);
      expect(result).toEqual(updatedPedido);
    });

    it('deve lançar erro se o pedido não existir', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(null);

      await expect(PedidoService.updatePedidoService(999, updateInput))
        .rejects
        .toThrow('Pedido não encontrado');
    });
  });

  describe('getPedidoByIdService', () => {
    it('deve retornar um pedido pelo ID', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(mockPedido);

      const result = await PedidoService.getPedidoByIdService(mockPedido.id);

      expect(PedidoRepository.findById).toHaveBeenCalledWith(mockPedido.id);
      expect(result).toEqual(mockPedido);
    });

    it('deve lançar erro se o pedido não existir', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(null);

      await expect(PedidoService.getPedidoByIdService(999))
        .rejects
        .toThrow('Pedido não encontrado');
    });
  });

  describe('deletePedidoService', () => {
    it('deve deletar um pedido pelo ID', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(mockPedido);
      jest.spyOn(PedidoRepository, 'remove').mockResolvedValueOnce(mockPedido);

      const result = await PedidoService.deletePedidoService(mockPedido.id);

      expect(PedidoRepository.remove).toHaveBeenCalledWith(mockPedido.id);
      expect(result).toBe(true);
    });

    it('deve retornar false ao tentar deletar pedido inexistente', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(null);

      const result = await PedidoService.deletePedidoService(999);

      expect(result).toBe(false);
    });
  });
}); 