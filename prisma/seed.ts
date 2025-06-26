import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Cria os perfis se não existirem
  const perfis = ['Admin', 'Professor', 'Aluno', 'Coordenador'];
  const perfisCriados: Record<string, { id: number }> = {};
  for (const nome of perfis) {
    const perfil = await prisma.perfil.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
    perfisCriados[nome] = perfil;
  }

  // 2. Cria usuários
  const senhaHash = await bcrypt.hash('senha123', 10);
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha: senhaHash,
      dataNascimento: new Date('1990-01-01'),
      sexo: 'M',
      perfilId: perfisCriados['Admin'].id,
      telefones: { create: [{ numero: '51999999999', descricao: 'Principal' }] }
    },
  });
  const coord = await prisma.usuario.upsert({
    where: { email: 'coordenador@coord.com' },
    update: {},
    create: {
      nome: 'Coordenador',
      email: 'coordenador@coord.com',
      senha: senhaHash,
      dataNascimento: new Date('1985-05-05'),
      sexo: 'F',
      perfilId: perfisCriados['Coordenador'].id,
      telefones: { create: [{ numero: '51988888888', descricao: 'Principal' }] }
    },
  });
  const prof = await prisma.usuario.upsert({
    where: { email: 'professor@prof.com' },
    update: {},
    create: {
      nome: 'Professor',
      email: 'professor@prof.com',
      senha: senhaHash,
      dataNascimento: new Date('1980-03-10'),
      sexo: 'M',
      perfilId: perfisCriados['Professor'].id,
      telefones: { create: [{ numero: '51987777777', descricao: 'Principal' }] }
    },
  });
  const aluno = await prisma.usuario.upsert({
    where: { email: 'aluno@aluno.com' },
    update: {},
    create: {
      nome: 'Aluno',
      email: 'aluno@aluno.com',
      senha: senhaHash,
      dataNascimento: new Date('2000-09-15'),
      sexo: 'F',
      perfilId: perfisCriados['Aluno'].id,
      telefones: { create: [{ numero: '51986666666', descricao: 'Principal' }] }
    },
  });
  const profMiguel = await prisma.usuario.upsert({
    where: { email: 'miguel.xavier@prof.com' },
    update: {},
    create: {
      nome: 'Miguel Xavier',
      email: 'miguel.xavier@prof.com',
      senha: senhaHash,
      dataNascimento: new Date('1982-04-12'),
      sexo: 'M',
      perfilId: perfisCriados['Professor'].id,
      telefones: { create: [{ numero: '51981234567', descricao: 'Principal' }] }
    },
  });
  const profMarcelo = await prisma.usuario.upsert({
    where: { email: 'marcelo.cohen@prof.com' },
    update: {},
    create: {
      nome: 'Marcelo Cohen',
      email: 'marcelo.cohen@prof.com',
      senha: senhaHash,
      dataNascimento: new Date('1978-11-23'),
      sexo: 'M',
      perfilId: perfisCriados['Professor'].id,
      telefones: { create: [{ numero: '51982345678', descricao: 'Principal' }] }
    },
  });
  const profEduardo = await prisma.usuario.upsert({
    where: { email: 'eduardo.arruda@prof.com' },
    update: {},
    create: {
      nome: 'Eduardo Arruda',
      email: 'eduardo.arruda@prof.com',
      senha: senhaHash,
      dataNascimento: new Date('1985-07-30'),
      sexo: 'M',
      perfilId: perfisCriados['Professor'].id,
      telefones: { create: [{ numero: '51983456789', descricao: 'Principal' }] }
    },
  });

  // 3. Prédio
  const predio = await prisma.predio.upsert({
    where: { nome: 'Prédio Central' },
    update: {},
    create: {
      nome: 'Prédio Central',
      numero: '1',
      descricao: 'Prédio principal do campus',
      rua: 'Rua Principal',
      numero_endereco: '100',
      bairro: 'Centro',
      cidade: 'Cidade',
      uf: 'RS',
      cep: '90000-000',
    },
  });

  // 4. Salas
  const sala1 = await prisma.sala.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nome: 'Sala 101',
      capacidade: 40,
      predioId: predio.id,
    },
  });
  const sala2 = await prisma.sala.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nome: 'Sala 102',
      capacidade: 30,
      predioId: predio.id,
    },
  });

  // 5. Tipos de recurso
  const tipoProj = await prisma.tipoRecurso.upsert({
    where: { nome: 'Projetor' },
    update: {},
    create: { nome: 'Projetor' },
  });
  const tipoComp = await prisma.tipoRecurso.upsert({
    where: { nome: 'Computador' },
    update: {},
    create: { nome: 'Computador' },
  });

  // 6. Recursos
  await prisma.recurso.upsert({
    where: { id: 1 },
    update: {},
    create: {
      descricao: 'Projetor Epson',
      status: 'Disponível',
      disponivel: true,
      tipo_recurso_id: tipoProj.id,
    },
  });
  await prisma.recurso.upsert({
    where: { id: 2 },
    update: {},
    create: {
      descricao: 'Computador Dell',
      status: 'Disponível',
      disponivel: true,
      tipo_recurso_id: tipoComp.id,
    },
  });

  // 7. Reservas
  await prisma.reserva.create({
    data: {
      salaId: sala1.id,
      usuarioId: prof.id,
      dataHora: new Date(Date.now() + 86400000), // amanhã
    },
  });
  await prisma.reserva.create({
    data: {
      salaId: sala2.id,
      usuarioId: aluno.id,
      dataHora: new Date(Date.now() + 2 * 86400000), // depois de amanhã
    },
  });

  console.log('Base populada com dados essenciais!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 