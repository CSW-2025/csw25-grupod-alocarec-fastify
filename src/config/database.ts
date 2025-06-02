import { PrismaClient } from '@prisma/client';

console.log('DATABASE_URL:', process.env.DATABASE_URL);

export const prisma = new PrismaClient();

// Só conecta ao banco se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  prisma.$connect()
    .then(() => console.log('Conexão com o banco de dados estabelecida!'))
    .catch((err: unknown) => {
      console.error('Erro ao conectar com o banco de dados:', err);
      process.exit(1);
    });
}
