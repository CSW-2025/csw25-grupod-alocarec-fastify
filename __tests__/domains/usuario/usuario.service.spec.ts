import * as UsuarioRepository from '../../../src/domains/usuario/usuario-repository';
import { createUserService, getUserByIdService } from '../../../src/domains/usuario/usuario-service';
import { Usuario, CreateUsuarioInput, Sexo } from '../../../src/domains/usuario/usuario-entity';

jest.mock('../../../src/domains/usuario/usuario-repository');

describe('UsuarioService', () => {
  const mockUsuario: Usuario = {
    id: 1,
    email: 'teste@example.com',
    nome: 'Usuario Teste',
    dataNascimento: new Date('2024-01-01'),
    sexo: Sexo.M,
    perfilId: 1,
    senha: 'senha123',
    telefones: [{ id: 1, numero: '123456789', descricao: 'celular' }],
    perfil: { id: 1, nome: 'Admin' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserService', () => {
    it('deve criar um usuário com sucesso', async () => {
      (UsuarioRepository.createUser as jest.Mock).mockResolvedValueOnce(mockUsuario);

      const input: CreateUsuarioInput = {
        email: 'teste@example.com',
        nome: 'Usuario Teste',
        dataNascimento: new Date('2024-01-01'),
        sexo: Sexo.M,
        perfilId: 1,
        senha: 'senha123',
        telefones: [{ numero: '123456789', descricao: 'celular' }]
      };

      const result = await createUserService(input);

      expect(result).toEqual(expect.objectContaining({ email: input.email, nome: input.nome }));
      expect(UsuarioRepository.createUser).toHaveBeenCalledWith(input);
    });
  });

  // ...outros testes para getUserByIdService, updateUserService, etc...
}); 