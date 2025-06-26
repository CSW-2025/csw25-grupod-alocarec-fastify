// Tipos globais para o front-end

export interface Perfil {
  id: number;
  nome: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  perfil?: Perfil;
  sexo?: string;
  dataNascimento?: string;
  telefones?: { numero: string; descricao: string }[];
  ativo?: boolean;
} 