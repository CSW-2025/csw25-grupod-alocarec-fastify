import * as PredioRepository from '../../../src/domains/predio/predio-repository';
import { createPredioService } from '../../../src/domains/predio/predio-service';

jest.mock('../../../src/domains/predio/predio-repository');

describe('PredioService', () => {
  it('deve criar predio', async () => {
    const input = { nome: 'P1', numero: '1', rua: 'A', numero_endereco: '1', bairro: 'B', cidade: 'C', uf: 'RS', cep: '000' } as any;
    const predio = { id: 1, ...input };
    (PredioRepository.createPredio as jest.Mock).mockResolvedValueOnce(predio);

    const result = await createPredioService(input);

    expect(result).toBeDefined();
    expect(PredioRepository.createPredio).toHaveBeenCalledWith(input);
  });
});
