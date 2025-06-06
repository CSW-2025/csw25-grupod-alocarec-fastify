import { prisma } from '../../../src/config/database';
import * as CurriculoRepository from '../../../src/domains/curriculo/curriculo-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { curriculo: { create: jest.fn() } } }));

describe('CurriculoRepository', () => {
  it('createCurriculo chama prisma', async () => {
    const input = { nome_curso: 'ADS' } as any;
    const cur = { id: 1, ...input };
    (prisma.curriculo.create as jest.Mock).mockResolvedValueOnce(cur);

    const result = await CurriculoRepository.createCurriculo(input);

    expect(result).toEqual(cur);
    expect(prisma.curriculo.create).toHaveBeenCalledWith({ data: input });
  });
});
