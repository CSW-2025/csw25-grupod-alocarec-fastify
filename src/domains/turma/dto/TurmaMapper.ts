import { Turma } from '../turma-entity';
import { TurmaResponseDTO } from './TurmaResponseDTO';

export function toTurmaResponseDTO(turma: Turma): TurmaResponseDTO {
  return {
    id: turma.id,
    numero: turma.numero,
    semestre: turma.semestre,
    professor_id: turma.professor_id,
    vagas: turma.vagas,
    disciplina_id: turma.disciplina_id,
  };
} 