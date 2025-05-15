export interface PredioResponseDTO {
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