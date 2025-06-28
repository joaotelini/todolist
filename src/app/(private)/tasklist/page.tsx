import { TaskList } from "@/components/TaskList";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET;

export default async function TaskListPrivate() {
  console.log(SECRET_KEY);
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não está definida");
  }

  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token?.value) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(token.value, SECRET_KEY);
    console.log(decoded);
  } catch (error) {
    console.log(error);
    redirect("/login");
  }

  return (
    <div className="flex text-white min-h-screen items-center flex-col justify-center bg-gradient-to-br from-stone-800 via-zinc-700 to-slate-900 ">
      <h1 className="mb-10 text-5xl font-bold text-center">Lista de Tarefas</h1>
      <div>
        <TaskList />
      </div>
    </div>
  );
}
