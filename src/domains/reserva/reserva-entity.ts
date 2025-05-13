export interface CreateReservaInput {
    aula: number;        
    recurso: string;      
    observacao?: string;  
  }
  
  export interface UpdateReservaInput {
    aula?: number;
    recurso?: string;
    observacao?: string;
  }
  