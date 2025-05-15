import { Reserva } from '../reserva-entity';
import { ReservaResponseDTO } from './ReservaResponseDTO';

export function toReservaResponseDTO(reserva: Reserva): ReservaResponseDTO {
  return {
    id: reserva.id,
    salaId: reserva.salaId,
    usuarioId: reserva.usuarioId,
    dataHora: reserva.dataHora,
    // Adicione outros campos públicos conforme necessário
  };
} 