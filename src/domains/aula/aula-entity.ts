import { HorarioEnum } from '../horario/horario-enum';

export interface Aula {
  id: number;
  nome: string;
  data_inicio: string;
  data_fim: string;
  descricao?: string;
  horario?: HorarioEnum;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateAulaInput = Omit<Aula, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAulaInput = Partial<CreateAulaInput>;
