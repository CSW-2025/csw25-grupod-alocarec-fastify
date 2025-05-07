export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
    tipo: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUsuarioInput = Omit<Usuario, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUsuarioInput = Partial<CreateUsuarioInput>;
  