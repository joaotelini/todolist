import axios from "axios";
import { LoginType, LoginApiResponse } from "@/types/LoginType";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const loginApi = async (data: LoginType): Promise<LoginApiResponse> => {
  try {
    const response = await api.post("api/auth/login", data);

    return {
      error: false,
      token: response.data?.token,
      message: response.data?.message,
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
