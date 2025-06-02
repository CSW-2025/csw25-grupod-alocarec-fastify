import * as jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'segredo_super_secreto';

export function gerarToken(
  payload: Record<string, unknown>,
  expiresIn: string | number = '1h'
) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
} 