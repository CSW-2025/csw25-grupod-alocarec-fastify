import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as PerfilService from '../../../src/domains/perfil/perfil-service';
import { CreatePerfilInput } from '../../../src/domains/perfil/perfil-entity';
import { PerfilResponseDTO } from '../../../src/domains/perfil/dto/PerfilResponseDTO';

jest.mock('../../../src/domains/perfil/perfil-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('PerfilController', () => {
  let app: FastifyInstance;

  beforeEach(async () => {
    app = await build();
  });

  it('POST /perfis cria perfil', async () => {
    const input: CreatePerfilInput = { nome: 'Novo' };
    const perfil: PerfilResponseDTO = { id: 1, ...input };
    (PerfilService.createPerfilService as jest.Mock).mockResolvedValueOnce(perfil);

    const response = await app.inject({
      method: 'POST',
      url: '/perfis',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(perfil);
  });
});
