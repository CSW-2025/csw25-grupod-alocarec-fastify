import * as PedidoRepository from '../../../src/domains/pedido/pedido-repository';
import { createPedidoService, getPedidoByIdService, updatePedidoService, deletePedidoService } from '../../../src/domains/pedido/pedido-service';
import { Pedido, CreatePedidoInput, Status } from '../../../src/domains/pedido/pedido-entity';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPedidoService', () => {
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

      jest.spyOn(PedidoRepository, 'create').mockResolvedValueOnce(mockPedido);

      const result = await createPedidoService(input);

      expect(result).toEqual(mockPedido);
      expect(PedidoRepository.create).toHaveBeenCalledWith(input);
    });

    it('deve lançar erro ao falhar na criação', async () => {
      const input: CreatePedidoInput = {
        aula_id: 1,
        disciplina_id: 2,
        status: Status.PENDENTE,
        nome: 'Pedido de Teste',
        moderador_id: null,
        sala_id: null,
        recurso_id: null
      };

      jest.spyOn(PedidoRepository, 'create').mockRejectedValueOnce(new Error('Erro ao criar pedido'));

      await expect(createPedidoService(input)).rejects.toThrow('Erro ao criar pedido');
    });
  });

  describe('getPedidoByIdService', () => {
    it('deve retornar um pedido pelo ID', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(mockPedido);

      const result = await getPedidoByIdService(1);

      expect(result).toEqual(mockPedido);
      expect(PedidoRepository.findById).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro quando pedido não encontrado', async () => {
      jest.spyOn(PedidoRepository, 'findById').mockResolvedValueOnce(null);

      await expect(getPedidoByIdService(999)).rejects.toThrow('Pedido não encontrado');
    });
  });

  describe('updatePedidoService', () => {
    it('deve atualizar um pedido com sucesso', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      const updatedPedido = { ...mockPedido, ...updateInput };
      jest.spyOn(PedidoRepository, 'update').mockResolvedValueOnce(updatedPedido);

      const result = await updatePedidoService(1, updateInput);

      expect(result).toEqual(updatedPedido);
      expect(PedidoRepository.update).toHaveBeenCalledWith(1, updateInput);
    });

    it('deve lançar erro quando pedido não encontrado', async () => {
      const updateInput = {
        status: Status.APROVADA
      };

      jest.spyOn(PedidoRepository, 'update').mockRejectedValueOnce(new Error('Pedido não encontrado'));

      await expect(updatePedidoService(999, updateInput)).rejects.toThrow('Pedido não encontrado');
    });
  });

  describe('deletePedidoService', () => {
    it('deve deletar um pedido com sucesso', async () => {
      jest.spyOn(PedidoRepository, 'remove').mockResolvedValueOnce(mockPedido);

      await deletePedidoService(1);

      expect(PedidoRepository.remove).toHaveBeenCalledWith(1);
    });

    it('deve lançar erro quando pedido não encontrado', async () => {
      jest.spyOn(PedidoRepository, 'remove').mockRejectedValueOnce(new Error('Pedido não encontrado'));

      await expect(deletePedidoService(999)).rejects.toThrow('Pedido não encontrado');
    });
  });
}); 