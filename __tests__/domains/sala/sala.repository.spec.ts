import { prisma } from '../../../src/config/database';
import * as SalaRepository from '../../../src/domains/sala/sala-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { sala: { create: jest.fn() } } }));

describe('SalaRepository', () => {
  it('createSala utiliza prisma', async () => {
    const input = { nome: 'S1' } as any;
    const sala = { id: 1, ...input };
    (prisma.sala.create as jest.Mock).mockResolvedValueOnce(sala);

    const result = await SalaRepository.createSala(input);

    expect(result).toEqual(sala);
    expect(prisma.sala.create).toHaveBeenCalledWith({ data: input, include: { predio: true } });
  });
});
