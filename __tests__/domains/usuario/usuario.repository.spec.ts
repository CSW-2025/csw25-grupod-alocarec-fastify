import { PrismaClient } from '@prisma/client';
import * as UsuarioRepository from '../../../src/domains/usuario/usuario-repository';
import { Usuario, CreateUsuarioInput, Sexo } from '../../../src/domains/usuario/usuario-entity';

jest.mock('@prisma/client', () => {
  const prismaMock = {
    usuario: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn().mockImplementation(() => prismaMock) };
});

describe('UsuarioRepository', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      const input: CreateUsuarioInput = {
        email: 'teste@example.com',
        nome: 'Usuario Teste',
        dataNascimento: new Date('2024-01-01'),
        sexo: Sexo.M,
        perfilId: 1,
        senha: 'senha123',
        telefones: [{ numero: '123456789', descricao: 'celular' }]
      };

      const mockUsuario: Usuario = {
        id: 1,
        ...input,
        telefones: [{ id: 1, numero: '123456789', descricao: 'celular' }],
        perfil: { id: 1, nome: 'Admin' }
      };

      (prisma.usuario.create as jest.Mock).mockResolvedValueOnce(mockUsuario);

      const result = await UsuarioRepository.createUser(input);

      expect(result).toEqual(mockUsuario);
      expect(prisma.usuario.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Object) }));
    });
  });

  // ...outros testes para findUnique, findMany, update, delete...
}); 