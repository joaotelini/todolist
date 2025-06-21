import { Task } from "../types/TaskType";
import axios from "axios";

export async function getTasksData(): Promise<Task[]> {
  try {
    const response = await axios.get("http://localhost:3334/tasks");
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

export async function saveTasksData(tasks: Task): Promise<Task | null> {
  try {
    // Enviando a url e o corpo da requisicao (tasks)
    const response = await axios.post("http://localhost:3334/tasks", tasks);
    return response.data as Task;
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
    const response = await axios.patch(`http://localhost:3334/tasks/${taskId}`, {
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
