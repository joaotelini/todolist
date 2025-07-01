import { connectDB } from "@/lib/mongodb";

type LoginType = {
  _id: string;
  email: string;
  password: string;
};

export const loginModel = async (email: string): Promise<LoginType | null> => {
  const db = await connectDB();
  const user = await db.collection<LoginType>("users").findOne({ email });
  return user;
};
