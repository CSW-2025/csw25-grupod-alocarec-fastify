import { createPedidoSchema, updatePedidoSchema } from '../../../src/domains/pedido/pedido-schema';

describe('PedidoSchemas', () => {
  describe('createPedidoSchema', () => {
    it('deve validar um pedido válido', () => {
      const validPedido = {
        nome: 'Pedido de Teste',
        aula_id: 1,
        disciplina_id: 2,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(validPedido);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar pedido sem nome', () => {
      const invalidPedido = {
        aula_id: 1,
        disciplina_id: 2,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('nome');
      }
    });

    it('deve rejeitar status inválido', () => {
      const invalidPedido = {
        nome: 'Pedido de Teste',
        aula_id: 1,
        disciplina_id: 2,
        status: 'INVALID_STATUS'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('status');
      }
    });

    it('deve rejeitar IDs negativos', () => {
      const invalidPedido = {
        nome: 'Pedido de Teste',
        aula_id: -1,
        disciplina_id: 2,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('aula_id');
      }
    });
  });

  describe('updatePedidoSchema', () => {
    it('deve validar atualização válida', () => {
      const validUpdate = {
        status: 'APROVADA'
      };

      const result = updatePedidoSchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });

    it('deve permitir atualização parcial', () => {
      const validUpdate = {
        nome: 'Novo Nome'
      };

      const result = updatePedidoSchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar status inválido na atualização', () => {
      const invalidUpdate = {
        status: 'INVALID_STATUS'
      };

      const result = updatePedidoSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('status');
      }
    });

    it('deve rejeitar IDs negativos na atualização', () => {
      const invalidUpdate = {
        aula_id: -1
      };

      const result = updatePedidoSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path[0]).toBe('aula_id');
      }
    });
  });
}); 