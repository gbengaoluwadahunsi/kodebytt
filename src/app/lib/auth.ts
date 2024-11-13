import jwt from 'jsonwebtoken'

export function verifyToken(token: string): string {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    return decoded.userId
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Invalid token: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}