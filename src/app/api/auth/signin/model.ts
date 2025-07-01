import { connectDB } from "@/lib/mongodb";

type SigninType = {
  fullname: string;
  email: string;
  password: string;
};

type MessageResponse = {
  error: boolean;
  message: string;
  data?: {
    _id: string;
    fullname: string;
    email: string;
  };
};

export const signinModel = async (
  data: SigninType
): Promise<MessageResponse> => {
  const db = await connectDB();

  const result = await db.collection<SigninType>("users").insertOne(data);

  return {
    error: false,
    message: "Usuário registrado com sucesso",
    data: {
      _id: result.insertedId.toString(),
      fullname: data.fullname,
      email: data.email,
    },
  };
};

export const findUserByEmail = async (email: string) => {
  const db = await connectDB();
  return await db.collection("users").findOne({ email });
};
