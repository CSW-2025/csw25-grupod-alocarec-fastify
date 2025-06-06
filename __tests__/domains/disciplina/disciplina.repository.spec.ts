import { prisma } from '../../../src/config/database';
import * as DisciplinaRepository from '../../../src/domains/disciplina/disciplina-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { disciplina: { create: jest.fn() } } }));

describe('DisciplinaRepository', () => {
  it('create chama prisma', async () => {
    const input = { nome: 'Teste', codigo: 'TST' } as any;
    const disc = { id: 1, ...input };
    (prisma.disciplina.create as jest.Mock).mockResolvedValueOnce(disc);

    const result = await DisciplinaRepository.create(input);

    expect(result).toEqual(disc);
    expect(prisma.disciplina.create).toHaveBeenCalledWith({ data: input });
  });
});
