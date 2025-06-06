import { createRecursoSchema, updateRecursoSchema } from '../../../src/domains/recurso/recurso-schema';

describe('RecursoSchema', () => {
  describe('createRecursoSchema', () => {
    it('valida recurso válido', () => {
      const valid = { descricao: 'Comp', status: 'ATIVO', disponivel: true, tipo_recurso_id: 1 };
      const result = createRecursoSchema.safeParse(valid);
      expect(result.success).toBe(true);
    });

    it('rejeita recurso sem descricao', () => {
      const result = createRecursoSchema.safeParse({ status: 'ATIVO', disponivel: true, tipo_recurso_id: 1 } as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updateRecursoSchema', () => {
    it('valida atualização', () => {
      const result = updateRecursoSchema.safeParse({ disponivel: false });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updateRecursoSchema.safeParse({ outro: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
