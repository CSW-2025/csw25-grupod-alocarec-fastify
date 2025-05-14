import { Usuario } from '../usuario-entity';
import { UsuarioResponseDTO } from './UsuarioResponseDTO';

export function toUsuarioResponseDTO(usuario: Usuario): UsuarioResponseDTO {
  return {
    id: usuario.id,
    email: usuario.email,
    nome: usuario.nome,
    dataNascimento: usuario.dataNascimento instanceof Date ? usuario.dataNascimento.toISOString() : String(usuario.dataNascimento),
    sexo: usuario.sexo,
    telefones: usuario.telefones.map(t => ({ id: t.id, numero: t.numero, descricao: t.descricao })),
    perfilId: usuario.perfilId,
    perfil: { id: usuario.perfil.id, nome: usuario.perfil.nome },
  };
} 