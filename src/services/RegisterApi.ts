import axios from "axios";
import { RegisterType } from "@/types/RegisterType";

export const registerApi = async (
  data: RegisterType
): Promise<{
  error: boolean;
  message?: string;
  data?: any;
}> => {
  try {
    const apiUrl = "http://localhost:3334/auth/register";

    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

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
