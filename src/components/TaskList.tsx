"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskType";
import { getTasksData } from "@/data/TaskData";
import { Trash2, BadgeCheck } from "lucide-react";

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
    <div className="mt-5 w-100">
      {tasks.length === 0 ? (
        <p className="text-center">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="flex flex-col gap-2 rounded p-4 shadow-lg">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between gap-5 bg-zinc-800 px-4 py-2 rounded"
            >
              <span>{task.taskName}</span>

              <div className="flex items-center gap-3">
                <BadgeCheck
                  className="w-5 h-5 cursor-pointer"
                  color="#3de1de"
                  strokeWidth={0.75}
                />
                <Trash2
                  className="w-5 h-5 cursor-pointer"
                  color="#bd2828"
                  strokeWidth={1.5}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
