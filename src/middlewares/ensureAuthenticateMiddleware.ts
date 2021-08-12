import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authconfig from '../config/authconfig';

interface TokenPayload{
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticateMiddleWare(
  request: Request, response: Response, next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  // split no token por que ele vem no formato Bearer {token}

  const [, token] = authHeader.split(' ');

  try {
    // se validou temos os dados do usuário como iat, exp, sub
    const decoded = verify(token, authconfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('invalid jwt token');
  }
}
