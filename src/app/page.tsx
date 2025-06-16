import { TaskInput } from "@/components/TaskInput";

export default function Home() {
  return (
    <div className="flex text-white min-h-screen items-center flex-col justify-center bg-gradient-to-br from-stone-800 via-zinc-700 to-slate-900 ">
      <h1 className="mb-10 text-5xl font-bold">Todo List com Shadcn</h1>
      <div>
        <TaskInput />
      </div>
    </div>
  );
}
