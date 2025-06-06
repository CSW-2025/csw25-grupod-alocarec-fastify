import * as PerfilRepository from '../../../src/domains/perfil/perfil-repository';
import { createPerfilService } from '../../../src/domains/perfil/perfil-service';

jest.mock('../../../src/domains/perfil/perfil-repository');

describe('PerfilService', () => {
  it('deve criar perfil', async () => {
    const input = { nome: 'Novo' } as any;
    const perfil = { id: 1, ...input };
    (PerfilRepository.createPerfil as jest.Mock).mockResolvedValueOnce(perfil);

    const result = await createPerfilService(input);

    expect(result).toBeDefined();
    expect(PerfilRepository.createPerfil).toHaveBeenCalledWith(input);
  });
});
