import axios from "axios";
import { RegisterType } from "@/types/RegisterType";

const api = axios.create({
  baseURL: "https://tasks-backend-b1yi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

type RegisterApiResponse = {
  error: boolean;
  message?: string;
  data?: string;
};

export const registerApi = async (
  data: RegisterType
): Promise<RegisterApiResponse> => {
  try {
    const response = await api.post("/auth/register", data);

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
