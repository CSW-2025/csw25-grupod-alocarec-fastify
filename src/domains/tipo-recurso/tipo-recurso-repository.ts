import { TipoRecurso, CreateTipoRecursoInput, UpdateTipoRecursoInput } from './tipo-recurso-entity';

let tipos: TipoRecurso[] = [
  { id: 1, nome: 'Projetor' },
  { id: 2, nome: 'Computador' },
];
let nextId = 3;

export async function createTipoRecurso(data: CreateTipoRecursoInput): Promise<TipoRecurso> {
  const novo: TipoRecurso = { id: nextId++, ...data };
  tipos.push(novo);
  return novo;
}

export async function getAllTipoRecursos(): Promise<TipoRecurso[]> {
  return tipos;
}

export async function getTipoRecursoById(id: number): Promise<TipoRecurso | null> {
  return tipos.find(t => t.id === id) || null;
}

export async function updateTipoRecurso(id: number, data: UpdateTipoRecursoInput): Promise<TipoRecurso | null> {
  const idx = tipos.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tipos[idx] = { ...tipos[idx], ...data };
  return tipos[idx];
}

export async function deleteTipoRecurso(id: number): Promise<boolean> {
  const idx = tipos.findIndex(t => t.id === id);
  if (idx === -1) return false;
  tipos.splice(idx, 1);
  return true;
}
