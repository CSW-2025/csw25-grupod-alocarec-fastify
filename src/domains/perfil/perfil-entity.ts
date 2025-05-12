export interface Perfil {
    id: number;
    nome: string; // Admin, Professor, Aluno, Coordenador
}

export type CreatePerfilInput = {
    nome: string;
};

export type UpdatePerfilInput = Partial<CreatePerfilInput>;
