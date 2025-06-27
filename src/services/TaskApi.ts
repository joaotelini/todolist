import { NewTask, Task } from "../types/TaskType";
import axios from "axios";

const api = axios.create({
  baseURL: "https://tasks-backend-b1yi.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export async function getTasksData(): Promise<Task[]> {
  try {
    const response = await api.get("/tasks");

    return response.data as Task[];
  } catch (error) {
    console.error("Erro ao buscar as tarefas", error);
    return [];
  }
}

export async function saveTasksData(tasks: NewTask): Promise<Task | null> {
  try {
    const response = await api.post("/tasks", tasks);

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
    await api.patch(`/tasks/${taskId}`, { status: newStatus });
    return true;
  } catch (error) {
    console.error("Erro ao atualizar status da tarefa", error);
    return false;
  }
}

export async function deleteTask(taskId: string): Promise<boolean> {
  try {
    await api.delete(`/tasks/${taskId}`);

    return true;
  } catch (error) {
    console.error("Erro ao deletar tarefa", error);
    return false;
  }
}
