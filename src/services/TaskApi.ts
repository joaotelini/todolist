import { NewTask, Task } from "../types/TaskType";
import axios from "axios";

export async function getTasksData(): Promise<Task[]> {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    const apiUrl = "http://localhost:3334/tasks";

    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data as Task[];
  } catch (error) {
    console.error("Erro ao buscar as tarefas", error);
    return [];
  }
}

export async function saveTasksData(tasks: NewTask): Promise<Task | null> {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    const apiUrl = "http://localhost:3334/tasks";

    const response = await axios.post(apiUrl, tasks, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao salvar as tarefas", error);
    return null;
  }
}

export async function setTaskCompleted(
  taskId: string,
  newStatus: boolean
): Promise<boolean> {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    const apiUrl = `http://localhost:3334/tasks/${taskId}`;

    await axios.patch(
      apiUrl,
      { status: newStatus },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return true;
  } catch (error) {
    console.error("Erro ao atualizar status da tarefa", error);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    const apiUrl = `http://localhost:3334/tasks/${taskId}`;

    await axios.delete(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return true;
  } catch (error) {
    console.error("Erro ao deletar tarefa", error);
    return false;
  }
}
