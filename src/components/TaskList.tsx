"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskType";
import { tasksData } from "@/data/TaskData";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const updateTasks = () => {
      setTasks(tasksData());
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
        <p className="">Nenhuma tarefa encontrada</p>
      ) : (
        <ul className="bg-gray-5 rounded p-4 shadow-md">
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
