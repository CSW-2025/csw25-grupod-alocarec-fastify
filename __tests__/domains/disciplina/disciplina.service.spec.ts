import * as DisciplinaRepository from '../../../src/domains/disciplina/disciplina-repository';
import { createDisciplinaService } from '../../../src/domains/disciplina/disciplina-service';

jest.mock('../../../src/domains/disciplina/disciplina-repository');

describe('DisciplinaService', () => {
  it('deve criar disciplina', async () => {
    const input = { nome: 'Teste', codigo: 'TST' } as any;
    const disc = { id: 1, ...input };
    (DisciplinaRepository.create as jest.Mock).mockResolvedValueOnce(disc);

    const result = await createDisciplinaService(input);

    expect(result).toBeDefined();
    expect(DisciplinaRepository.create).toHaveBeenCalledWith(input);
  });
});
