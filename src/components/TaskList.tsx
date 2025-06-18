"use client";
import { useEffect, useState } from "react";
import { Task } from "@/types/TaskType";
import { getTasksData } from "@/data/TaskData";
import { Trash2, BadgeCheck } from "lucide-react";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

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
    <div className="mt-5 w-100 transition-all duration-300">
      {tasks.length === 0 ? (
        <p className="text-center">Nenhuma tarefa encontrada.</p>
      ) : (
        <ul className="flex flex-col gap-2 rounded-lg p-4 shadow-lg">
          {tasks
            .sort((a, b) => Number(a.completed) - Number(b.completed))
            .map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between gap-5 px-4 py-2 rounded-lg ${
                  task.completed ? "bg-zinc-500" : "bg-zinc-800"
                }`}
              >
                <span
                  className={`${task.completed ? "line-through italic" : ""}`}
                >
                  {task.taskName}
                </span>

                <div className="flex items-center gap-3">
                  <BadgeCheck
                    onClick={() => handleCompleteTask(task.id)}
                    className="w-5 h-5 cursor-pointer"
                    color="#3de1de"
                    strokeWidth={0.75}
                  />
                  <Trash2
                    onClick={() => handleDeleteTask(task.id)}
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
