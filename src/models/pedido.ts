
export enum Status {
  PENDENTE = 'pendente',
  APROVADA = 'aprovada',
  REJEITADA = 'rejeitada',
}

export interface Pedido {
  id?: number;
  aula_id: number;
  disciplina_id: number;
  status: Status;
}
