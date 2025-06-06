import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as PredioService from '../../../src/domains/predio/predio-service';
import { CreatePredioInput } from '../../../src/domains/predio/predio-entity';
import { PredioResponseDTO } from '../../../src/domains/predio/dto/PredioResponseDTO';

jest.mock('../../../src/domains/predio/predio-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('PredioController', () => {
  let app: FastifyInstance;
  beforeEach(async () => {
    app = await build();
  });

  it('POST /predios cria predio', async () => {
    const input: CreatePredioInput = {
      nome: 'P1',
      numero: '1',
      rua: 'A',
      numero_endereco: '1',
      bairro: 'B',
      cidade: 'C',
      uf: 'RS',
      cep: '000'
    };
    const predio: PredioResponseDTO = { id: 1, ...input };
    (PredioService.createPredioService as jest.Mock).mockResolvedValueOnce(predio);

    const response = await app.inject({
      method: 'POST',
      url: '/predios',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(predio);
  });
});
