import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as CurriculoService from '../../../src/domains/curriculo/curriculo-service';
import { CurriculoResponseDTO } from '../../../src/domains/curriculo/dto/CurriculoResponseDTO';
import { CreateCurriculoInput } from '../../../src/domains/curriculo/curriculo-entity';

jest.mock('../../../src/domains/curriculo/curriculo-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('CurriculoController', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await build();
  });

  it('POST /curriculos cria curriculo', async () => {
    const input: CreateCurriculoInput = { nome_curso: 'ADS', semestre_inicio_vigencia: '2024.1', semestre_fim_vigencia: '2024.2' };
    const cur: CurriculoResponseDTO = { id: 1, ...input };
    (CurriculoService.createCurriculoService as jest.Mock).mockResolvedValueOnce(cur);

    const response = await app.inject({
      method: 'POST',
      url: '/curriculos',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(cur);
  });
});
