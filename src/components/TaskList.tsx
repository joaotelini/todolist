"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Trash2 } from "lucide-react";
import { getTasksData, setTaskCompleted } from "@/services/TaskApi";
import { Task } from "@/types/TaskType";
import { TaskInput } from "./TaskInput";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    const updatedTasks = await getTasksData();
    setTasks(updatedTasks);
    setIsLoading(false);
  };

  const handleSetCompleted = async (task: Task) => {
    await setTaskCompleted(task.id, !task.status);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mt-5 w-100 transition-all duration-300">
      <TaskInput onAddTask={fetchTasks} />
      {isLoading ? (
        <ul className="flex flex-col gap-2 rounded-lg p-4 shadow-lg">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between gap-5 px-4 py-2 rounded-lg bg-zinc-800"
            >
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full animate-pulse" />
                <Skeleton className="h-5 w-5 rounded-full animate-pulse " />
              </div>
            </li>
          ))}
        </ul>
      ) : tasks.length === 0 ? (
        <p className="text-center mt-5">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="flex flex-col gap-2 rounded-lg p-4 shadow-lg transition-opacity duration-300">
          {tasks
            .sort((a, b) => Number(a.status) - Number(b.status))
            .map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between gap-5 px-4 py-2 rounded-lg ${
                  task.status ? "bg-zinc-500" : "bg-zinc-800"
                }`}
              >
                <span className={`${task.status ? "line-through italic" : ""}`}>
                  {task.title}
                </span>

                <div className="flex items-center gap-3">
                  <BadgeCheck
                    onClick={() => handleSetCompleted(task)}
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
