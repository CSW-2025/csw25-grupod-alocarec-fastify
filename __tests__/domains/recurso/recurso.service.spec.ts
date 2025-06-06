import * as RecursoRepository from '../../../src/domains/recurso/recurso-repository';
import { createRecursoService } from '../../../src/domains/recurso/recurso-service';

jest.mock('../../../src/domains/recurso/recurso-repository');

describe('RecursoService', () => {
  it('deve criar recurso', async () => {
    const input = { descricao: 'Comp', status: 'ATIVO', disponivel: true, tipo_recurso_id: 1 } as any;
    const rec = { id: 1, ...input };
    (RecursoRepository.createRecurso as jest.Mock).mockResolvedValueOnce(rec);

    const result = await createRecursoService(input);

    expect(result).toBeDefined();
    expect(RecursoRepository.createRecurso).toHaveBeenCalledWith(input);
  });
});
