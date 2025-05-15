export interface TurmaResponseDTO {
  id: number;
  numero: string;
  semestre: string;
  professor_id: number;
  vagas: number;
  disciplina_id?: number;
} 