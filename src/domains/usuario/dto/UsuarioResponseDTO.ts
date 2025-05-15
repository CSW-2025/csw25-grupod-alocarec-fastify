import { Sexo } from '../usuario-entity';

export interface UsuarioResponseDTO {
  id: number;
  email: string;
  nome: string;
  dataNascimento: string;
  sexo: Sexo;
  telefones: { id: number; numero: string; descricao: string }[];
  perfilId: number;
  perfil: { id: number; nome: string };
} 