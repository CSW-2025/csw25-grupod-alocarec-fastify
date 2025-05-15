import { Recurso } from '../recurso-entity';
import { RecursoResponseDTO } from './RecursoResponseDTO';

export function toRecursoResponseDTO(recurso: Recurso): RecursoResponseDTO {
  return {
    id: recurso.id,
    descricao: recurso.descricao,
    status: recurso.status,
    disponivel: recurso.disponivel,
    tipo_recurso_id: recurso.tipo_recurso_id,
  };
} 