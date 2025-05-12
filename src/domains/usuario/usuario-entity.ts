export interface Telefone {
    id: number;
    numero: string;
    descricao: string;
}

export interface Perfil {
    id: number;
    nome: string; // Admin, Professor, Aluno, Coordenador
}

export interface Usuario {
    id: number;
    email: string;
    nome: string;
    dataNascimento: Date;
    sexo: string;
    telefones: Telefone[];
    perfilId: number;
    perfil: Perfil;
}

export type CreateUsuarioInput = {
    email: string;
    nome: string;
    dataNascimento: Date;
    sexo: string;
    telefones: Omit<Telefone, 'id'>[];
    perfilId: number;
};

export type UpdateUsuarioInput = Partial<CreateUsuarioInput>;
  