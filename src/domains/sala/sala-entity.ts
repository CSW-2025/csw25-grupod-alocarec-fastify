export interface Sala {
  id: number;
  nome: string;
  capacidade: number;
  predioId: number;
  predio?: any; // pode ser detalhado depois
}

export type CreateSalaInput = {
  nome: string;
  capacidade: number;
  predioId: number;
};

export type UpdateSalaInput = Partial<CreateSalaInput>; 