import { Task } from "../types/TaskType";

export function tasksData(): Task[] {
  const data = localStorage.getItem("tasks");
  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Task[];
  } catch (error) {
    console.error("Erro ao parsear o localStorage", error);
    return [];
  }
}
