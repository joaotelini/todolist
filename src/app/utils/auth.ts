import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type JwtPayloadCustom = {
  id: string;
};

export const getUserFromToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.warn("JWT_SECRET não está definido");
      return null;
    }

    const decoded = jwt.verify(token, secret) as JwtPayloadCustom;

    return decoded.id;
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return null;
  }
};
