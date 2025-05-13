export interface Reserva {
  id: number;
  salaId: number;
  usuarioId: number;
  dataHora: string; // ou Date
  sala?: any;
  usuario?: any;
}

export type CreateReservaInput = {
  salaId: number;
  usuarioId: number;
  dataHora: string;
};

export type UpdateReservaInput = Partial<CreateReservaInput>; 