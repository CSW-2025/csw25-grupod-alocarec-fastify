import * as SalaRepository from '../../../src/domains/sala/sala-repository';
import { createSalaService } from '../../../src/domains/sala/sala-service';

jest.mock('../../../src/domains/sala/sala-repository');

describe('SalaService', () => {
  it('deve criar sala', async () => {
    const input = { nome: 'S1', capacidade: 10, predioId: 1 } as any;
    const sala = { id: 1, ...input };
    (SalaRepository.createSala as jest.Mock).mockResolvedValueOnce(sala);

    const result = await createSalaService(input);

    expect(result).toBeDefined();
    expect(SalaRepository.createSala).toHaveBeenCalledWith(input);
  });
});
