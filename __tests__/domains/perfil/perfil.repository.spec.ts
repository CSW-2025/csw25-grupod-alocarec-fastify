import { prisma } from '../../../src/config/database';
import * as PerfilRepository from '../../../src/domains/perfil/perfil-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { perfil: { create: jest.fn() } } }));

describe('PerfilRepository', () => {
  it('createPerfil chama prisma', async () => {
    const input = { nome: 'Novo' } as any;
    const perfil = { id: 1, ...input };
    (prisma.perfil.create as jest.Mock).mockResolvedValueOnce(perfil);

    const result = await PerfilRepository.createPerfil(input);

    expect(result).toEqual(perfil);
    expect(prisma.perfil.create).toHaveBeenCalledWith({ data: input });
  });
});
