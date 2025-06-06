import { createCurriculoSchema, updateCurriculoSchema } from '../../../src/domains/curriculo/curriculo-schema';

describe('CurriculoSchema', () => {
  describe('createCurriculoSchema', () => {
    it('valida curriculo válido', () => {
      const valid = { nome_curso: 'ADS', semestre_inicio_vigencia: '2024.1', semestre_fim_vigencia: '2024.2' };
      const result = createCurriculoSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita curriculo sem nome_curso', () => {
      const invalid = { semestre_inicio_vigencia: '2024.1', semestre_fim_vigencia: '2024.2' } as any;
      const result = createCurriculoSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('updateCurriculoSchema', () => {
    it('valida atualização parcial', () => {
      const result = updateCurriculoSchema.safeParse({ nome_curso: 'Eng' });
      expect(result.success).toBe(true);
    });

    it('rejeita campos extras', () => {
      const result = updateCurriculoSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
