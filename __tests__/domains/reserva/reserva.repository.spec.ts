import { prisma } from '../../../src/config/database';
import * as ReservaRepository from '../../../src/domains/reserva/reserva-repository';

jest.mock('../../../src/config/database', () => ({ prisma: { reserva: { create: jest.fn() } } }));

describe('ReservaRepository', () => {
  it('createReserva utiliza prisma', async () => {
    const input = { salaId: 1 } as any;
    const res = { id: 1, ...input };
    (prisma.reserva.create as jest.Mock).mockResolvedValueOnce(res);

    const result = await ReservaRepository.createReserva(input);

    expect(result).toEqual(res);
    expect(prisma.reserva.create).toHaveBeenCalledWith({ data: input, include: { sala: true, usuario: true } });
  });
});
