import { createDisciplinaSchema, updateDisciplinaSchema } from '../../../src/domains/disciplina/disciplina-schema';

describe('DisciplinaSchema', () => {
  describe('createDisciplinaSchema', () => {
    it('valida disciplina válida', () => {
      const valid = { nome: 'Algoritmos', codigo: 'ALG1', creditos: 4, carga_horaria: 60 };
      const result = createDisciplinaSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita disciplina sem nome', () => {
      const invalid = { codigo: 'ALG1', creditos: 4, carga_horaria: 60 } as any;
      const result = createDisciplinaSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });

  describe('updateDisciplinaSchema', () => {
    it('valida update', () => {
      const result = updateDisciplinaSchema.safeParse({ codigo: 'ALG2' });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateDisciplinaSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
