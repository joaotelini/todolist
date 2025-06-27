"use client";

import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { loginApi } from "@/services/LoginApi";
import { LoginType } from "@/types/LoginType";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const data: LoginType = { email, password };

    try {
      const response = await loginApi(data);

      if (response.error) {
        console.log("❌ Erro encontrado na resposta:", response.error);
        console.log("❌ Mensagem de erro:", response.message);
        toast.error(response.message || "Erro ao fazer login.");
        return;
      } else {
        console.log("✅ Login bem-sucedido!");

        console.log("🍪 Cookies atuais ANTES:", document.cookie);

        toast.success("Login realizado com sucesso!");

        setTimeout(() => {
          router.push("/tasklist");
        }, 200);
      }
    } catch (error) {
      console.log("💥 Erro capturado no try/catch:", error);
      console.log("💥 Error type:", typeof error);
      console.log("💥 Error message:", error);
      console.log("💥 Error stack:", error);

      toast.error("Erro inesperado ao fazer login.");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 text-zinc-100 rounded-2xl p-8 space-y-6">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-semibold text-violet-400">
          Bem-vindo de volta
        </CardTitle>
        <p className="text-sm text-zinc-400">Faça seu login para continuar.</p>
      </CardHeader>

      <CardContent className="space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            Entrar →
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm text-zinc-400 mt-2">
        Não tem conta?
        <Link href="/register">
          <Button
            variant="link"
            className="text-violet-400 ml-1 p-0 h-auto underline cursor-pointer"
          >
            Cadastre-se
          </Button>
        </Link>
      </CardFooter>
    </div>
  );
}
