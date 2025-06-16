"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskType";
import { getTasksData } from "@/data/TaskData";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const updateTasks = () => {
      setTasks(getTasksData());
    };

    // Pega a atualizacao enviada
    window.addEventListener("tasksUpdated", updateTasks);
    updateTasks();

    return () => {
      window.removeEventListener("tasksUpdated", updateTasks);
    };
  }, []);

  return (
    <div className="mt-10">
      {tasks.length === 0 ? (
        <p className="text-center">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="rounded p-4 shadow-lg">
          {tasks.map((task) => (
            <li key={task.id} className="p-2 text-white">
              {task.taskName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
