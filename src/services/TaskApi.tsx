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

// TODO: implementar editar tarefa no backend

// export async function updateTaskData(task: Task): Promise<any> {
//   try {
//     const response = await axios.put(
//       `http://localhost:3334/tasks/${task.id}`,
//       task
//     );
//     return response.data as Task;
//   } catch (error) {
//     console.error("Erro ao atualizar a tarefa", error);
//     return null;
//   }
// }
