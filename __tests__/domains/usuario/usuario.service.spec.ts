import * as UsuarioRepository from '../../../src/domains/usuario/usuario-repository';
import { createUserService, getUserByIdService, updateUserService } from '../../../src/domains/usuario/usuario-service';
import bcrypt from 'bcryptjs';
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
      const hashSpy = jest.spyOn(bcrypt as any, 'hash').mockResolvedValueOnce('hashed');

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
      expect(hashSpy).toHaveBeenCalledWith('senha123', 10);
      expect(UsuarioRepository.createUser).toHaveBeenCalledWith({ ...input, senha: 'hashed' });
    });
  });

  describe('updateUserService', () => {
    it('deve atualizar a senha com hash', async () => {
      (UsuarioRepository.updateUser as jest.Mock).mockResolvedValueOnce(mockUsuario);
      const hashSpy = jest.spyOn(bcrypt as any, 'hash').mockResolvedValueOnce('hashed');
      const result = await updateUserService(1, { senha: 'novaSenha' });

      expect(hashSpy).toHaveBeenCalledWith('novaSenha', 10);
      expect(UsuarioRepository.updateUser).toHaveBeenCalledWith(1, { senha: 'hashed' });
      expect(result).toEqual(expect.objectContaining({ email: mockUsuario.email }));
    });

    it('deve atualizar perfilId e telefones', async () => {
      (UsuarioRepository.updateUser as jest.Mock).mockResolvedValueOnce(mockUsuario);
      const updateInput = {
        perfilId: 2,
        telefones: [{ numero: '987654321', descricao: 'casa' }]
      };

      await updateUserService(1, updateInput);

      expect(UsuarioRepository.updateUser).toHaveBeenCalledWith(1, updateInput);
    });
  });

  // ...outros testes para getUserByIdService, updateUserService, etc...
}); 