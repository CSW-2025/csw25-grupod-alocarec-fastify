import { prisma } from '../../../src/config/database';
import * as PredioRepository from '../../../src/domains/predio/predio-repository';

jest.mock('../../../src/config/database', () => ({
  prisma: { predio: { create: jest.fn() } }
}));

describe('PredioRepository', () => {
  beforeEach(() => { /* no-op */ });

  it('createPredio usa prisma', async () => {
    const input = { nome: 'P1' } as any;
    const predio = { id: 1, ...input };
    (prisma.predio.create as jest.Mock).mockResolvedValueOnce(predio);

    const result = await PredioRepository.createPredio(input);

    expect(result).toEqual(predio);
    expect(prisma.predio.create).toHaveBeenCalledWith({ data: input });
  });
});
