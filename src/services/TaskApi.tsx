import { Task } from "../types/TaskType";
import axios from "axios";

export async function getTasksData(): Promise<Task[]> {
  try {
    const response = await axios.get("http://localhost:3334/tasks");
    return response.data as Task[];
  } catch (error) {
    console.error("Erro ao buscar as tarefas", error);
    return [];
  }
}

export async function saveTasksData(tasks: Task): Promise<any> {
  try {
    const response = await axios.post("http://localhost:3334/tasks", tasks);
    return response.data as Task[];
  } catch (error) {
    console.error("Erro ao salvar a tarefa", error);
    return [];
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
