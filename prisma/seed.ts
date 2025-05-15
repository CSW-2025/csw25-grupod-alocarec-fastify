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

  // 2. Cria o usuário admin
  const senhaHash = await bcrypt.hash('admin123', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha: senhaHash,
      dataNascimento: new Date('1990-01-01'),
      sexo: 'M',
      perfilId: perfisCriados['Admin'].id,
      telefones: {
        create: [
          { numero: '51999999999', descricao: 'Principal' }
        ]
      }
    },
  });

  console.log('Perfis e usuário admin criados!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 