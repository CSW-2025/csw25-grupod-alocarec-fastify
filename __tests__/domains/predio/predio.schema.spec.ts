import { createPredioSchema, updatePredioSchema } from '../../../src/domains/predio/predio-schema';

describe('PredioSchema', () => {
  describe('createPredioSchema', () => {
    it('valida prédio válido', () => {
      const valid = {
        numero: '1',
        nome: 'Prédio A',
        rua: 'Rua 1',
        numero_endereco: '100',
        bairro: 'Centro',
        cidade: 'Cidade',
        uf: 'ST',
        cep: '00000-000'
      };
      const result = createPredioSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita prédio sem nome', () => {
      const result = createPredioSchema.safeParse({ numero: '1' } as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePredioSchema', () => {
    it('valida update', () => {
      const result = updatePredioSchema.safeParse({ nome: 'Prédio B' });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updatePredioSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
