import { Perfil } from '../perfil-entity';
import { PerfilResponseDTO } from './PerfilResponseDTO';

export function toPerfilResponseDTO(perfil: Perfil): PerfilResponseDTO {
  return {
    id: perfil.id,
    nome: perfil.nome,
  };
} 