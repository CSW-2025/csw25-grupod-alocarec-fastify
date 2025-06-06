import { createTurmaSchema, updateTurmaSchema } from '../../../src/domains/turma/turma-schema';

describe('TurmaSchema', () => {
  describe('createTurmaSchema', () => {
    it('valida turma válida', () => {
      const valid = { numero: '1', semestre: '2024.1', professor_id: 1, vagas: 30 };
      const result = createTurmaSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita turma sem numero', () => {
      const result = createTurmaSchema.safeParse({ semestre: '2024.1', professor_id: 1, vagas: 30 } as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updateTurmaSchema', () => {
    it('valida update', () => {
      const result = updateTurmaSchema.safeParse({ vagas: 40 });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateTurmaSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
