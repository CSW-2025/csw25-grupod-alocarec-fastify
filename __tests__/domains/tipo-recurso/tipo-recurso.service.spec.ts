import * as TipoRepository from '../../../src/domains/tipo-recurso/tipo-recurso-repository';
import { createTipoRecursoService } from '../../../src/domains/tipo-recurso/tipo-recurso-service';

jest.mock('../../../src/domains/tipo-recurso/tipo-recurso-repository');

describe('TipoRecursoService', () => {
  it('deve criar tipo de recurso', async () => {
    const input = { nome: 'Novo' } as any;
    const tipo = { id: 1, ...input };
    (TipoRepository.createTipoRecurso as jest.Mock).mockResolvedValueOnce(tipo);

    const result = await createTipoRecursoService(input);

    expect(result).toBeDefined();
    expect(TipoRepository.createTipoRecurso).toHaveBeenCalledWith(input);
  });
});
