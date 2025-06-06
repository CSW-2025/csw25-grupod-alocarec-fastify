import * as ReservaRepository from '../../../src/domains/reserva/reserva-repository';
import { createReservaService } from '../../../src/domains/reserva/reserva-service';

jest.mock('../../../src/domains/reserva/reserva-repository');

describe('ReservaService', () => {
  it('deve criar reserva', async () => {
    const input = { salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' } as any;
    const res = { id: 1, ...input };
    (ReservaRepository.createReserva as jest.Mock).mockResolvedValueOnce(res);

    const result = await createReservaService(input);

    expect(result).toBeDefined();
    expect(ReservaRepository.createReserva).toHaveBeenCalledWith(input);
  });
});
