import { PrismaClient } from '@prisma/client';

// Aumenta o timeout padrão para 10 segundos
jest.setTimeout(10000);

// Mock do PrismaClient para os testes
const mockPrismaClient = {
  $connect: jest.fn(),
  $disconnect: jest.fn(),
  pedido: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
} as unknown as PrismaClient;

// Mock global do PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrismaClient)
}));

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
}); 