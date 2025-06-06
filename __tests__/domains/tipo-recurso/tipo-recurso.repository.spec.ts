import * as TipoRepository from '../../../src/domains/tipo-recurso/tipo-recurso-repository';

describe('TipoRecursoRepository', () => {
  it('createTipoRecurso adiciona item', async () => {
    const tipo = await TipoRepository.createTipoRecurso({ nome: 'Novo' });
    expect(tipo).toEqual({ id: expect.any(Number), nome: 'Novo' });
  });
});
