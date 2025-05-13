export interface Recurso {
  id: number;
  descricao: string;
  status: string;
  disponivel: boolean;
  tipo_recurso_id: number;
}

export type CreateRecursoInput = Omit<Recurso, 'id'>;

export type UpdateRecursoInput = Partial<CreateRecursoInput>;
