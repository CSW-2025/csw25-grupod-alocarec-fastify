import { Disciplina } from '../disciplina-entity';
import { DisciplinaResponseDTO } from './DisciplinaResponseDTO';

export function toDisciplinaResponseDTO(disciplina: any): DisciplinaResponseDTO {
  return {
    id: disciplina.id,
    nome: disciplina.nome,
    codigo: disciplina.codigo,
    creditos: disciplina.creditos,
    carga_horaria: disciplina.carga_horaria,
    ementa: disciplina.ementa ?? undefined,
    // Adicione outros campos públicos conforme necessário
  };
} 