import { TipoRecurso } from '../tipo-recurso-entity';
import { TipoRecursoResponseDTO } from './TipoRecursoResponseDTO';

export function toTipoRecursoResponseDTO(tipo: TipoRecurso): TipoRecursoResponseDTO {
  return {
    id: tipo.id,
    nome: tipo.nome,
  };
} 