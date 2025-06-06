import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './jwt';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    reply.code(401).send({ message: 'Token ausente.' });
    return;
  }
  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    (request as any).user = decoded;
  } catch (err) {
    reply.code(401).send({ message: 'Token inválido.' });
  }
}
