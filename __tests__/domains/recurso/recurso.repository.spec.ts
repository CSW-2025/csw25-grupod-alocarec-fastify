import { prisma } from '../../../src/config/database';
import * as RecursoRepository from '../../../src/domains/recurso/recurso-repository';

jest.mock('../../../src/config/database', () => ({
  prisma: { recurso: { create: jest.fn() } }
}));

describe('RecursoRepository', () => {
  beforeEach(() => { /* no-op */ });

  it('createRecurso usa prisma', async () => {
    const input = { descricao: 'Comp' } as any;
    const rec = { id: 1, ...input };
    (prisma.recurso.create as jest.Mock).mockResolvedValueOnce(rec);

    const result = await RecursoRepository.createRecurso(input);

    expect(result).toEqual(rec);
    expect(prisma.recurso.create).toHaveBeenCalledWith({ data: input });
  });
});
