import { createReservaSchema, updateReservaSchema } from '../../../src/domains/reserva/reserva-schema';

describe('ReservaSchema', () => {
  describe('createReservaSchema', () => {
    it('valida reserva válida', () => {
      const valid = { salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' };
      const result = createReservaSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita reserva sem salaId', () => {
      const result = createReservaSchema.safeParse({ usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' } as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updateReservaSchema', () => {
    it('valida update', () => {
      const result = updateReservaSchema.safeParse({ dataHora: '2024-01-02T00:00:00Z' });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateReservaSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
