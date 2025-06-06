import { AulaRepository } from '../../../src/domains/aula/aula-repository';

jest.mock('../../../src/domains/aula/aula-repository');

describe('AulaService', () => {
  it('deve criar uma aula', async () => {
    const input = { nome: 'Aula Teste', data_inicio: '2024-01-01T00:00:00Z', data_fim: '2024-01-01T01:00:00Z' } as any;
    const aula = { id: 1, ...input };
    (AulaRepository as unknown as jest.Mock).mockImplementation(() => ({ create: jest.fn().mockResolvedValueOnce(aula) }));

    const { createAula } = await import('../../../src/domains/aula/aula-service');
    const result = await createAula(input);

    expect(result).toEqual(expect.objectContaining({ id: 1 }));
  });
});
