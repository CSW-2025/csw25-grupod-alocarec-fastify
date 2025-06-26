import * as ReservaRepository from '../../../src/domains/reserva/reserva-repository';
import { createReservaService, updateReservaService } from '../../../src/domains/reserva/reserva-service';

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

  it('deve rejeitar reserva em conflito', async () => {
    const input = { salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' } as any;
    (ReservaRepository.findReservaBySalaAndDataHora as jest.Mock).mockResolvedValueOnce({ id: 2 });

    await expect(createReservaService(input)).rejects.toThrow('Já existe uma reserva para esta sala neste horário');
  });

  it('deve rejeitar update em conflito', async () => {
    const current = { id: 1, salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' };
    (ReservaRepository.findReservaById as jest.Mock).mockResolvedValueOnce(current);
    (ReservaRepository.findReservaBySalaAndDataHora as jest.Mock).mockResolvedValueOnce({ id: 2 });

    await expect(updateReservaService(1, { dataHora: '2024-01-02T00:00:00Z' })).rejects.toThrow('Já existe uma reserva para esta sala neste horário');
  });
});
