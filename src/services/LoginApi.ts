import axios from "axios";

const api = axios.create({
  baseURL: "https://tasks-backend-b1yi.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const loginApi = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);

    // Verificar se a resposta do backend indica sucesso
    const isSuccess = response.status >= 200 && response.status < 300;

    console.log("🎯 [LOGIN-API] Login bem-sucedido?", isSuccess);

    if (isSuccess) {
      return {
        success: true,
        error: false,
        data: response.data,
        message: response.data?.message || "Login realizado com sucesso!",
      };
    } else {
      return {
        success: false,
        error: true,
        message: response.data?.message || "Erro no login",
      };
    }
  } catch (error: Error | any) {
    console.log("❌ [LOGIN-API] Erro capturado:", error);

    if (error.response) {
      return {
        success: false,
        error: true,
        message:
          error.response.data?.message || `Erro ${error.response.status}`,
      };
    } else if (error.request) {
      return {
        success: false,
        error: true,
        message: "Erro de conexão com o servidor",
      };
    } else {
      return {
        success: false,
        error: true,
        message: error.message || "Erro desconhecido",
      };
    }
  }
};
