import { createUsuarioSchema } from '../../../src/domains/usuario/usuario-schema';

describe('UsuarioSchema', () => {
  it('deve validar um usuário válido', () => {
    const validUsuario = {
      email: 'teste@example.com',
      nome: 'Usuario Teste',
      dataNascimento: '2024-01-01T00:00:00.000Z',
      sexo: 'M',
      perfilId: 1,
      senha: 'senha123',
      telefones: [{ numero: '123456789', descricao: 'celular' }]
    };

    const result = createUsuarioSchema.safeParse(validUsuario);
    expect(result.success).toBe(true);
  });

  it('deve rejeitar usuário sem email', () => {
    const invalidUsuario = {
      nome: 'Usuario Teste',
      dataNascimento: '2024-01-01T00:00:00.000Z',
      sexo: 'M',
      perfilId: 1,
      senha: 'senha123',
      telefones: [{ numero: '123456789', descricao: 'celular' }]
    };

    const result = createUsuarioSchema.safeParse(invalidUsuario);
    expect(result.success).toBe(false);
  });

  // ...outros testes de validação...
}); 