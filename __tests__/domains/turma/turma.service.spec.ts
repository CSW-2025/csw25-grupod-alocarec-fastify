import * as TurmaRepository from '../../../src/domains/turma/turma-repository';
import { createTurmaService } from '../../../src/domains/turma/turma-service';

jest.mock('../../../src/domains/turma/turma-repository');

describe('TurmaService', () => {
  it('deve criar turma', async () => {
    const input = { numero: '1', semestre: '2024/1', professor_id: 1, vagas: 10 } as any;
    const turma = { id: 1, ...input };
    (TurmaRepository.createTurma as jest.Mock).mockResolvedValueOnce(turma);

    const result = await createTurmaService(input);

    expect(result).toBeDefined();
    expect(TurmaRepository.createTurma).toHaveBeenCalledWith(input);
  });
});
