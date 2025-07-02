import { getUserFromToken } from "@/app/utils/auth";
import { TaskList } from "@/components/TaskList";
import { redirect } from "next/navigation";

export default async function TaskListPrivate() {
  const userId = getUserFromToken();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex text-white min-h-screen items-center flex-col justify-center bg-gradient-to-br from-stone-800 via-zinc-700 to-slate-900">
      <h1 className="mb-10 text-5xl font-bold text-center">Lista de Tarefas</h1>
      <TaskList />
    </div>
  );
}
