import { signinModel, findUserByEmail } from "./model";
import bcrypt from "bcrypt";

export const signinService = async (
  fullname: string,
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("Usuário já cadastrado");

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const data = { fullname, email, password: passwordHash };

  return await signinModel(data);
};
