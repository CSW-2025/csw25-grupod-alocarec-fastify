import { createPerfilSchema, updatePerfilSchema } from '../../../src/domains/perfil/perfil-schema';

describe('PerfilSchema', () => {
  describe('createPerfilSchema', () => {
    it('valida perfil válido', () => {
      const result = createPerfilSchema.safeParse({ nome: 'Admin' });
      expect(result.success).toBe(true);
    });

    it('rejeita perfil sem nome', () => {
      const result = createPerfilSchema.safeParse({} as any);
      expect(result.success).toBe(false);
    });
  });

  describe('updatePerfilSchema', () => {
    it('aceita atualização', () => {
      const result = updatePerfilSchema.safeParse({ nome: 'Professor' });
      expect(result.success).toBe(true);
    });

    it('rejeita campo extra', () => {
      const result = updatePerfilSchema.safeParse({ x: 1 } as any);
      expect(result.success).toBe(false);
    });
  });
});
