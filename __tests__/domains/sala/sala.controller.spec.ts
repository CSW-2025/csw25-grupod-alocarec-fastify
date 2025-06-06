import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as SalaService from '../../../src/domains/sala/sala-service';
import { CreateSalaInput } from '../../../src/domains/sala/sala-entity';
import { SalaResponseDTO } from '../../../src/domains/sala/dto/SalaResponseDTO';

jest.mock('../../../src/domains/sala/sala-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('SalaController', () => {
  let app: FastifyInstance;
  beforeEach(async () => { app = await build(); });

  it('POST /salas cria sala', async () => {
    const input: CreateSalaInput = { nome: 'S1', capacidade: 10, predioId: 1 };
    const sala: SalaResponseDTO = { id: 1, ...input };
    (SalaService.createSalaService as jest.Mock).mockResolvedValueOnce(sala);

    const response = await app.inject({
      method: 'POST',
      url: '/salas',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(sala);
  });
});
