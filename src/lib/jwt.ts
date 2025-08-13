import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// ? Token payload का type define करो
export interface TokenPayload {
  id: string;
  role: "admin" | "patient" | "staff";
  name?: string;
}

// ? Token Generate Function
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET);
};

// ? Token Verify Function (with type-safe return)
export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};
