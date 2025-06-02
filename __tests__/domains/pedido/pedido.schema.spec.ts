import { createPedidoSchema, updatePedidoSchema } from '../../../src/domains/pedido/pedido-schema';

describe('PedidoSchema', () => {
  describe('createPedidoSchema', () => {
    it('deve validar um pedido válido', () => {
      const validPedido = {
        aula_id: 1,
        disciplina_id: 2,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(validPedido);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar um pedido sem aula_id', () => {
      const invalidPedido = {
        disciplina_id: 2,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar um pedido sem disciplina_id', () => {
      const invalidPedido = {
        aula_id: 1,
        status: 'PENDENTE'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar um pedido com status inválido', () => {
      const invalidPedido = {
        aula_id: 1,
        disciplina_id: 2,
        status: 'INVALIDO'
      };

      const result = createPedidoSchema.safeParse(invalidPedido);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePedidoSchema', () => {
    it('deve validar uma atualização válida', () => {
      const validUpdate = {
        status: 'APROVADA'
      };

      const result = updatePedidoSchema.safeParse(validUpdate);
      expect(result.success).toBe(true);
    });

    it('deve rejeitar uma atualização com status inválido', () => {
      const invalidUpdate = {
        status: 'INVALIDO'
      };

      const result = updatePedidoSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
    });

    it('deve rejeitar uma atualização com campos inválidos', () => {
      const invalidUpdate = {
        aula_id: 1,
        disciplina_id: 2
      };

      const result = updatePedidoSchema.safeParse(invalidUpdate);
      expect(result.success).toBe(false);
    });
  });
}); 