import axios from "axios";
import { LoginType } from "@/types/LoginType";

const api = axios.create({
  baseURL: "https://tasks-backend-b1yi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type LoginApiResponse = {
  error: boolean;
  message?: string;
  data?: string;
};

export const loginApi = async (data: LoginType): Promise<LoginApiResponse> => {
  try {
    const response = await api.post("/auth/login", data);

    console.log("Login response:", response.data);

    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiMessage = error.response?.data?.message;
      return {
        error: true,
        message: apiMessage || error.message,
      };
    }

    return {
      error: true,
      message: "Erro inesperado",
    };
  }
};
