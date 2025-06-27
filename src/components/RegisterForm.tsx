"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { User, Mail, Lock } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RegisterType } from "@/types/RegisterType";
import { registerApi } from "@/services/RegisterApi";

export function RegisterForm() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullname || !email || !password) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const data: RegisterType = { fullname, email, password };

    const result = await registerApi(data);

    if (result?.error) {
      toast.error(result.message || "Erro ao criar conta.");
      return;
    }

    toast.success("Conta criada com sucesso!");

    router.push("/login");

    setFullname("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 text-zinc-100 rounded-2xl p-8 space-y-6">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-semibold">Criar Conta</CardTitle>
        <p className="text-sm text-zinc-400">
          Preencha seus dados para começar
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Label htmlFor="fullname" className="mb-1 block text-zinc-300">
              Nome Completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                id="fullname"
                name="fullname"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type="text"
                placeholder="João da Silva"
                required
                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>

          <div className="relative">
            <Label htmlFor="email" className="mb-1 block text-zinc-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="joao@gmail.com"
                required
                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>

          <div className="relative">
            <Label htmlFor="password" className="mb-1 block text-zinc-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <Input
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="••••••••"
                required
                className="pl-10 bg-zinc-800 border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-base font-semibold bg-violet-600 hover:bg-violet-700 active:scale-95 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-sm text-zinc-400 mt-2">
        Já tem uma conta?{" "}
        <Link href="/login">
          <Button
            variant="link"
            className="text-violet-400 ml-1 p-0 h-auto underline cursor-pointer"
          >
            Login
          </Button>
        </Link>
      </CardFooter>
    </div>
  );
}
