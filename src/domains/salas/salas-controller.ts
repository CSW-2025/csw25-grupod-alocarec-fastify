import { FastifyReply, FastifyRequest } from 'fastify';


const prisma = new PrismaClient();

// Criar Sala
export async function createSala(
  request: FastifyRequest<{ Body: { numSala: string, capacidade: number, andar: string, recurso?: string } }>,
  reply: FastifyReply
) {
  try {
    const { numSala, capacidade, andar, recurso } = request.body;
    const sala = await prisma.sala.create({
      data: {
        numSala,
        capacidade,
        andar,
        recurso,
      },
    });
    return reply.code(201).send(sala);
  } catch (error) {
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Erro ao criar a sala',
    });
  }
}

// Listar Salas
export async function getAllSalas(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const salas = await prisma.sala.findMany();
    return reply.send(salas);
  } catch (error) {
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Erro ao listar as salas',
    });
  }
}
