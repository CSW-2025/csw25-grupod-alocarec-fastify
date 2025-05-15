export interface DisciplinaResponseDTO {
  id: number;
  nome: string;
  codigo: string;
  creditos: number;
  carga_horaria: number;
  ementa?: string;
  // Adicione outros campos públicos conforme necessário
} 