import { Curriculo } from '../curriculo-entity';
import { CurriculoResponseDTO } from './CurriculoResponseDTO';

export function toCurriculoResponseDTO(curriculo: any): CurriculoResponseDTO {
  return {
    id: curriculo.id,
    nome_curso: curriculo.nome_curso,
    semestre_inicio_vigencia: curriculo.semestre_inicio_vigencia,
    semestre_fim_vigencia: curriculo.semestre_fim_vigencia,
    // Adicione outros campos públicos conforme necessário
  };
} 