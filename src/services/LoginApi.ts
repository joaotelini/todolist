import axios from "axios";
import { LoginType } from "@/types/LoginType";

export const loginApi = async (
  data: LoginType
): Promise<{
  error: boolean;
  message?: string;
  data?: string;
}> => {
  try {
    const apiUrl = "http://localhost:3334/auth/login";

    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

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
