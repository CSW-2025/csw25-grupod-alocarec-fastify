import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as AulaService from '../../../src/domains/aula/aula-service';
import { CreateAulaInput } from '../../../src/domains/aula/aula-entity';
import { AulaResponseDTO } from '../../../src/domains/aula/dto/AulaResponseDTO';

jest.mock('../../../src/domains/aula/aula-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, email: 'admin@admin.com', perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('AulaController', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await build();
  });

  it('POST /aulas cria aula', async () => {
    const input: CreateAulaInput = {
      nome: 'Aula Teste',
      data_inicio: '2024-01-01T00:00:00Z',
      data_fim: '2024-01-01T01:00:00Z'
    };
    const aula: AulaResponseDTO = { id: 1, ...input };
    (AulaService.createAula as jest.Mock).mockResolvedValueOnce(aula);

    const response = await app.inject({
      method: 'POST',
      url: '/aulas',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(aula);
  });
});
