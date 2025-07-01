import axios from "axios";
import { RegisterType, RegisterApiResponse } from "@/types/RegisterType";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerApi = async (
  data: RegisterType
): Promise<RegisterApiResponse> => {
  try {
    const response = await api.post("api/auth/signin", data);

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
