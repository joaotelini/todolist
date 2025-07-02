import axios from "axios";
import {
  NewTaskType,
  EditStatusTaskType,
  TaskApiResponse,
} from "../types/TaskType";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const getTasksData = async (): Promise<TaskApiResponse> => {
  try {
    const response = await api.get("/api/tasks");

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

export const saveTasksData = async (
  data: NewTaskType
): Promise<TaskApiResponse> => {
  try {
    const response = await api.post("/api/tasks", data);

    return {
      error: false,
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

export const setTaskCompleted = async (
  data: EditStatusTaskType
): Promise<TaskApiResponse> => {
  try {
    const response = await api.patch(`/api/tasks/${data._id}`, data);
    return {
      error: false,
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

export const deleteTask = async (taskId: string): Promise<TaskApiResponse> => {
  try {
    const response = await api.delete(`/api/tasks/${taskId}`);
    return {
      error: false,
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
