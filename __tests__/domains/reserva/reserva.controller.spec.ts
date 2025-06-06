import { FastifyInstance } from 'fastify';
import { build } from '../../../src/app';
import * as ReservaService from '../../../src/domains/reserva/reserva-service';
import { CreateReservaInput } from '../../../src/domains/reserva/reserva-entity';
import { ReservaResponseDTO } from '../../../src/domains/reserva/dto/ReservaResponseDTO';

jest.mock('../../../src/domains/reserva/reserva-service');
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, perfil: { id: 1, nome: 'Admin' } }),
  sign: jest.requireActual('jsonwebtoken').sign
}));

describe('ReservaController', () => {
  let app: FastifyInstance;
  beforeEach(async () => { app = await build(); });

  it('POST /reservas cria reserva', async () => {
    const input: CreateReservaInput = { salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' };
    const res: ReservaResponseDTO = { id: 1, ...input };
    (ReservaService.createReservaService as jest.Mock).mockResolvedValueOnce(res);

    const response = await app.inject({
      method: 'POST',
      url: '/reservas',
      payload: input,
      headers: { authorization: 'Bearer token' }
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual(res);
  });
});
