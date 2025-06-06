import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as TurmaService from '../../../src/domains/turma/turma-service';
import { CreateTurmaInput } from '../../../src/domains/turma/turma-entity';
import { TurmaResponseDTO } from '../../../src/domains/turma/dto/TurmaResponseDTO';

jest.mock('../../../src/domains/turma/turma-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('TurmaController', () => {
  let app: FastifyInstance;
  beforeEach(async () => { app = await build(); });

  it('POST /turmas cria turma', async () => {
    const input: CreateTurmaInput = { numero: '1', semestre: '2024/1', professor_id: 1, vagas: 10 };
    const turma: TurmaResponseDTO = { id: 1, ...input };
    (TurmaService.createTurmaService as jest.Mock).mockResolvedValueOnce(turma);

    const response = await app.inject({
      method: 'POST',
      url: '/turmas',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(turma);
  });
});
