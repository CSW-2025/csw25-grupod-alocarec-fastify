export interface Predio {
  id: number;
  numero: string;
  nome: string;
  descricao?: string;
  rua: string;
  numero_endereco: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export type CreatePredioInput = Omit<Predio, 'id'>;

export type UpdatePredioInput = Partial<CreatePredioInput>;
