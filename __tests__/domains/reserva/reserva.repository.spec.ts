import { prisma } from '../../../src/config/database';
import * as ReservaRepository from '../../../src/domains/reserva/reserva-repository';

jest.mock('../../../src/config/database', () => ({
  prisma: {
    reserva: {
      create: jest.fn(),
      findFirst: jest.fn()
    }
  }
}));

describe('ReservaRepository', () => {
  it('createReserva utiliza prisma', async () => {
    const input = { salaId: 1 } as any;
    const res = { id: 1, ...input };
    (prisma.reserva.create as jest.Mock).mockResolvedValueOnce(res);

    const result = await ReservaRepository.createReserva(input);

    expect(result).toEqual(res);
    expect(prisma.reserva.create).toHaveBeenCalledWith({ data: input, include: { sala: true, usuario: true } });
  });

  it('findReservaBySalaAndDataHora utiliza prisma', async () => {
    const res = { id: 1, salaId: 1, usuarioId: 1, dataHora: '2024-01-01T00:00:00Z' };
    (prisma.reserva.findFirst as jest.Mock).mockResolvedValueOnce(res);

    const result = await ReservaRepository.findReservaBySalaAndDataHora(1, '2024-01-01T00:00:00Z');

    expect(result).toEqual(res);
    expect(prisma.reserva.findFirst).toHaveBeenCalledWith({
      where: { salaId: 1, dataHora: new Date('2024-01-01T00:00:00Z') },
      include: { sala: true, usuario: true }
    });
  });
});
