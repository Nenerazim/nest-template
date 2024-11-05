import jwt from 'jsonwebtoken';

export class TokenGeneration {
  private readonly token: string;
  constructor(token: string) {
    this.token = token;
  }
  public static generateToken<T>(data: T, timestamp: number): string {
    return jwt.sign({ ...data }, process.env.SECRET_KEY, { expiresIn: timestamp });
  }

  public static verifyToken<T>(token: string): T {
    return jwt.verify(token, process.env.SECRET_KEY);
  }
}
