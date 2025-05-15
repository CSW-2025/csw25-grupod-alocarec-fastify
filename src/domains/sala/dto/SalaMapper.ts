import { Sala } from '../sala-entity';
import { SalaResponseDTO } from './SalaResponseDTO';

export function toSalaResponseDTO(sala: Sala): SalaResponseDTO {
  return {
    id: sala.id,
    nome: sala.nome,
    capacidade: sala.capacidade,
    predioId: sala.predioId,
    // Adicione outros campos públicos conforme necessário
  };
} 