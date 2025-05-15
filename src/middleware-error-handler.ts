import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponseDTO:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 404
 *         error:
 *           type: string
 *           example: NotFoundError
 *         message:
 *           type: string
 *           example: Recurso não encontrado
 */
export interface ErrorResponseDTO {
  statusCode: number;
  error: string;
  message: string;
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const statusCode = (error as any).statusCode || 500;
  const response: ErrorResponseDTO = {
    statusCode,
    error: error.name || 'InternalServerError',
    message: error.message || 'Erro inesperado',
  };
  reply.status(statusCode).send(response);
} 