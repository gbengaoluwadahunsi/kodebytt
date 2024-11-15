import jwt from 'jsonwebtoken';

export function verifyToken(token: string): string {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch (error) {
    // Assert error as an instance of Error to access message property
    if (error instanceof Error) {
      throw new Error('Invalid token: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
