import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as DisciplinaService from '../../../src/domains/disciplina/disciplina-service';
import { CreateDisciplinaInput } from '../../../src/domains/disciplina/disciplina-entity';
import { DisciplinaResponseDTO } from '../../../src/domains/disciplina/dto/DisciplinaResponseDTO';

jest.mock('../../../src/domains/disciplina/disciplina-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('DisciplinaController', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await build();
  });

  it('POST /disciplinas cria disciplina', async () => {
    const input: CreateDisciplinaInput = { nome: 'Teste', codigo: 'TST', creditos: 4, carga_horaria: 60 };
    const disc: DisciplinaResponseDTO = { id: 1, ...input };
    (DisciplinaService.createDisciplinaService as jest.Mock).mockResolvedValueOnce(disc);

    const response = await app.inject({
      method: 'POST',
      url: '/disciplinas',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(disc);
  });
});
