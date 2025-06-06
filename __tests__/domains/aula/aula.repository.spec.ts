import { prisma } from '../../../src/config/database';
import { AulaRepository } from '../../../src/domains/aula/aula-repository';

jest.mock('../../../src/config/database', () => ({
  prisma: { aula: { create: jest.fn() } }
}));

describe('AulaRepository', () => {
  let repo: AulaRepository;

  beforeEach(() => {
    repo = new AulaRepository();
  });

  it('create deve salvar aula', async () => {
    const input = { nome: 'Aula Teste' } as any;
    const aula = { id: 1, ...input };
    (prisma.aula.create as jest.Mock).mockResolvedValueOnce(aula);

    const result = await repo.create(input);

    expect(result).toEqual(aula);
    expect(prisma.aula.create).toHaveBeenCalledWith({ data: input });
  });
});
