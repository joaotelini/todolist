import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getUserFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Token ausente");

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  return decoded.id;
};
