import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as TipoService from '../../../src/domains/tipo-recurso/tipo-recurso-service';
import { CreateTipoRecursoInput } from '../../../src/domains/tipo-recurso/tipo-recurso-entity';
import { TipoRecursoResponseDTO } from '../../../src/domains/tipo-recurso/dto/TipoRecursoResponseDTO';

jest.mock('../../../src/domains/tipo-recurso/tipo-recurso-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('TipoRecursoController', () => {
  let app: FastifyInstance;
  beforeEach(async () => { app = await build(); });

  it('POST /tipos-recurso cria tipo', async () => {
    const input: CreateTipoRecursoInput = { nome: 'Novo' };
    const tipo: TipoRecursoResponseDTO = { id: 1, ...input };
    (TipoService.createTipoRecursoService as jest.Mock).mockResolvedValueOnce(tipo);

    const response = await app.inject({
      method: 'POST',
      url: '/tipos-recurso',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(tipo);
  });
});
