import { prisma } from '../../../src/config/database';
import * as TurmaRepository from '../../../src/domains/turma/turma-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { turma: { create: jest.fn() } } }));

describe('TurmaRepository', () => {
  it('createTurma usa prisma', async () => {
    const input = { numero: '1' } as any;
    const turma = { id: 1, ...input };
    (prisma.turma.create as jest.Mock).mockResolvedValueOnce(turma);

    const result = await TurmaRepository.createTurma(input);

    expect(result).toEqual(turma);
    expect(prisma.turma.create).toHaveBeenCalledWith({ data: input });
  });
});
