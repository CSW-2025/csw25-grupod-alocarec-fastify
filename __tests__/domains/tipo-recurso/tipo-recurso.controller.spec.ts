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

  it('GET /tipos-recurso retorna todos', async () => {
    const tipos: TipoRecursoResponseDTO[] = [{ id: 1, nome: 'Projetor' }];
    (TipoService.getAllTipoRecursosService as jest.Mock).mockResolvedValueOnce(tipos);

    const response = await app.inject({
      method: 'GET',
      url: '/tipos-recurso',
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(tipos);
  });

  it('GET /tipos-recurso/:id retorna tipo', async () => {
    const tipo: TipoRecursoResponseDTO = { id: 1, nome: 'Projetor' };
    (TipoService.getTipoRecursoByIdService as jest.Mock).mockResolvedValueOnce(tipo);

    const response = await app.inject({
      method: 'GET',
      url: '/tipos-recurso/1',
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(tipo);
  });

  it('PUT /tipos-recurso/:id atualiza tipo', async () => {
    const input = { nome: 'Atualizado' };
    const tipo: TipoRecursoResponseDTO = { id: 1, nome: 'Atualizado' };
    (TipoService.updateTipoRecursoService as jest.Mock).mockResolvedValueOnce(tipo);

    const response = await app.inject({
      method: 'PUT',
      url: '/tipos-recurso/1',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(tipo);
  });

  it('DELETE /tipos-recurso/:id remove tipo', async () => {
    (TipoService.deleteTipoRecursoService as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await app.inject({
      method: 'DELETE',
      url: '/tipos-recurso/1',
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(204);
  });
});
