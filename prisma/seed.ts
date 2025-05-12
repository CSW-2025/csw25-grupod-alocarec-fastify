import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const perfis = ['Admin', 'Professor', 'Aluno', 'Coordenador'];
  for (const nome of perfis) {
    await prisma.perfil.upsert({
      where: { nome },
      update: {},
      create: { nome }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 