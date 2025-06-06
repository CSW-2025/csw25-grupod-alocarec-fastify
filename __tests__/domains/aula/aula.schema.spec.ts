import { createAulaSchema, updateAulaSchema } from '../../../src/domains/aula/aula-schema';

describe('AulaSchema', () => {
  describe('createAulaSchema', () => {
    it('valida uma aula válida', () => {
      const valid = {
        nome: 'Aula Teste',
        data_inicio: '2024-01-01T00:00:00Z',
        data_fim: '2024-01-01T01:00:00Z'
      };
      const result = createAulaSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita aula sem nome', () => {
      const invalid = {
        data_inicio: '2024-01-01T00:00:00Z',
        data_fim: '2024-01-01T01:00:00Z'
      } as any;
      const result = createAulaSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('updateAulaSchema', () => {
    it('aceita atualização parcial', () => {
      const result = updateAulaSchema.safeParse({ descricao: 'nova' });
      expect(result.success).toBe(true);
    });

    it('rejeita campos extras', () => {
      const result = updateAulaSchema.safeParse({ desconhecido: 'x' } as any);
      expect(result.success).toBe(false);
    });
  });
});
