import * as CurriculoRepository from '../../../src/domains/curriculo/curriculo-repository';
import { createCurriculoService } from '../../../src/domains/curriculo/curriculo-service';

jest.mock('../../../src/domains/curriculo/curriculo-repository');

describe('CurriculoService', () => {
  it('deve criar curriculo', async () => {
    const input = { nome_curso: 'ADS' } as any;
    const cur = { id: 1, ...input };
    (CurriculoRepository.createCurriculo as jest.Mock).mockResolvedValueOnce(cur);

    const result = await createCurriculoService(input);

    expect(result).toBeDefined();
    expect(CurriculoRepository.createCurriculo).toHaveBeenCalledWith(input);
  });
});
