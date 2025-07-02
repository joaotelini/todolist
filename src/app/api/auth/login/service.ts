import { loginModel } from "./model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export const loginService = async (email: string, password: string) => {
  const user = await loginModel(email);

  if (!user) throw new Error("Usuário não encontrado");

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return { message: "Usuário logado com sucesso", token: token };
};
