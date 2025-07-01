import { connectDB } from "@/lib/mongodb";

type UserType = {
  _id: string;
  fullname: string;
  email: string;
  password: string;
};

export const loginModel = async (email: string): Promise<UserType | null> => {
  const db = await connectDB();
  const user = await db.collection<UserType>("users").findOne({ email });
  return user;
};
