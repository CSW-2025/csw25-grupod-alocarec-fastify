import { createTipoRecursoSchema, updateTipoRecursoSchema } from '../../../src/domains/tipo-recurso/tipo-recurso-schema';

describe('TipoRecursoSchema', () => {
  describe('createTipoRecursoSchema', () => {
    it('valida tipo válido', () => {
      const result = createTipoRecursoSchema.safeParse({ nome: 'Projetor' });
      expect(result.success).toBe(true);
    });

    it('rejeita tipo sem nome', () => {
      const result = createTipoRecursoSchema.safeParse({} as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updateTipoRecursoSchema', () => {
    it('aceita update', () => {
      const result = updateTipoRecursoSchema.safeParse({ nome: 'Computador' });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateTipoRecursoSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
