import { Aula } from '../aula-entity';
import { AulaResponseDTO } from './AulaResponseDTO';

export function toAulaResponseDTO(aula: any): AulaResponseDTO {
  return {
    id: aula.id,
    nome: aula.nome,
    data_inicio: aula.data_inicio instanceof Date ? aula.data_inicio.toISOString() : String(aula.data_inicio),
    data_fim: aula.data_fim instanceof Date ? aula.data_fim.toISOString() : String(aula.data_fim),
    // Adicione outros campos públicos conforme necessário
  };
} 