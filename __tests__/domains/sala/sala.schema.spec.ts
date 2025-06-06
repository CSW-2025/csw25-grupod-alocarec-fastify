import { createSalaSchema, updateSalaSchema } from '../../../src/domains/sala/sala-schema';

describe('SalaSchema', () => {
  describe('createSalaSchema', () => {
    it('valida sala válida', () => {
      const result = createSalaSchema.safeParse({ nome: 'Lab', capacidade: 30, predioId: 1 });
      expect(result.success).toBe(true);
    });

    it('rejeita sala sem nome', () => {
      const result = createSalaSchema.safeParse({ capacidade: 30, predioId: 1 } as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updateSalaSchema', () => {
    it('aceita update', () => {
      const result = updateSalaSchema.safeParse({ capacidade: 40 });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateSalaSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
