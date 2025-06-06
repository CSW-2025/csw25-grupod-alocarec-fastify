export interface Telefone {
    id: number;
    numero: string;
    descricao: string;
}

export interface Perfil {
    id: number;
    nome: string; // Admin, Professor, Aluno, Coordenador
}

export enum Sexo {
    M = 'M',
    F = 'F'
}

export interface Usuario {
    id: number;
    email: string;
    nome: string;
    dataNascimento: Date;
    sexo: Sexo;
    telefones: Telefone[];
    perfilId: number;
    perfil: Perfil;
    senha: string;
}

export type CreateUsuarioInput = {
    email: string;
    nome: string;
    dataNascimento: Date;
    sexo: Sexo;
    telefones: Omit<Telefone, 'id'>[];
    perfilId: number;
    senha: string;
};

export type UpdateUsuarioInput = Partial<CreateUsuarioInput>;
  