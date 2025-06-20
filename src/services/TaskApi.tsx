import { NewTask, Task } from "../types/TaskType";
import axios from "axios";

export async function getTasksData(): Promise<Task[]> {
  try {
    const apiUrl = "http://localhost:3334/tasks";
    const response = await axios.get(apiUrl);
    return response.data as Task[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar as tarefas", {
        message: error.message,
        status: error.response?.status,
      });
    } else {
      console.error("Erro desconhecido ao buscar as tarefas", {
        message: (error as Error).message,
      });
    }

    return [];
  }
}

export async function saveTasksData(tasks: NewTask): Promise<Task | null> {
  try {
    const apiUrl = "http://localhost:3334/tasks";
    // Enviando a url e o corpo da requisicao (tasks)
    const response = await axios.post(apiUrl, tasks);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao salvar as tarefas", {
        message: error.message,
        status: error.response?.status,
      });
    } else {
      console.error("Erro desconhecido ao salvar as tarefas", {
        message: (error as Error).message,
      });
    }
    return null;
  }
}

export async function setTaskCompleted(
  taskId: number,
  newStatus: boolean
): Promise<boolean> {
  try {
    const apiUrl = `http://localhost:3334/tasks/${taskId}`;
    const response = await axios.patch(apiUrl, {
      status: newStatus,
    });

    console.log(response);

    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao salvar as tarefas", {
        message: error.message,
        status: error.response?.status,
      });
    } else {
      console.error("Erro desconhecido ao salvar as tarefas", {
        message: (error as Error).message,
      });
    }
    return false;
  }
}

export async function deleteTask(taskId: number): Promise<boolean> {
  try {
    const apiUrl = `http://localhost:3334/tasks/${taskId}`;
    await axios.delete(apiUrl);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao deletar a tarefa", {
        message: error.message,
        status: error.response?.status,
      });
    } else {
      console.error("Erro desconhecido ao deletar a tarefa", {
        message: (error as Error).message,
      });
    }
    return false;
  }
}
