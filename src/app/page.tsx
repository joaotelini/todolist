import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 text-zinc-100 max-w-md mx-auto bg-zinc-900">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Todo List</h1>
      <p className="mb-6">Gerencie suas tarefas de forma simples e rápida.</p>
      <Link href="/login" className="text-violet-400 underline">
        Faça login
      </Link>
      {" ou "}
      <Link href="/register" className="text-violet-400 underline">
        cadastre-se
      </Link>
      {" para começar."}
    </main>
  );
}
