import { Predio } from '../predio-entity';
import { PredioResponseDTO } from './PredioResponseDTO';

export function toPredioResponseDTO(predio: any): PredioResponseDTO {
  return {
    id: predio.id,
    numero: predio.numero,
    nome: predio.nome,
    descricao: predio.descricao ?? undefined,
    rua: predio.rua,
    numero_endereco: predio.numero_endereco,
    complemento: predio.complemento ?? undefined,
    bairro: predio.bairro,
    cidade: predio.cidade,
    uf: predio.uf,
    cep: predio.cep,
  };
} 