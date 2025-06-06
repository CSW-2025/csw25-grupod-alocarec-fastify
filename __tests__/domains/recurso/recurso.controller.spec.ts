import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as RecursoService from '../../../src/domains/recurso/recurso-service';
import { CreateRecursoInput } from '../../../src/domains/recurso/recurso-entity';
import { RecursoResponseDTO } from '../../../src/domains/recurso/dto/RecursoResponseDTO';

jest.mock('../../../src/domains/recurso/recurso-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('RecursoController', () => {
  let app: FastifyInstance;
  beforeEach(async () => { app = await build(); });

  it('POST /recursos cria recurso', async () => {
    const input: CreateRecursoInput = { descricao: 'Comp', status: 'ATIVO', disponivel: true, tipo_recurso_id: 1 };
    const rec: RecursoResponseDTO = { id: 1, ...input };
    (RecursoService.createRecursoService as jest.Mock).mockResolvedValueOnce(rec);

    const response = await app.inject({
      method: 'POST',
      url: '/recursos',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(rec);
  });
});
