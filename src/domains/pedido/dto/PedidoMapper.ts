import { Pedido } from '../pedido-entity';
import { PedidoResponseDTO } from './PedidoResponseDTO';

export function toPedidoResponseDTO(pedido: Pedido): PedidoResponseDTO {
  return {
    id: pedido.id,
    aula_id: pedido.aula_id,
    disciplina_id: pedido.disciplina_id,
    status: pedido.status,
    // Adicione outros campos públicos conforme necessário
  };
} 