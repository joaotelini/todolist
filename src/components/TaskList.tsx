"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Trash2 } from "lucide-react";
import { getTasksData, setTaskCompleted, deleteTask } from "@/services/TaskApi";
import { TaskType, EditStatusTaskType } from "@/types/TaskType";
import { TaskModal } from "./TaskModal";
import { toast } from "sonner";

export const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    const updatedTasks = await getTasksData();
    setTasks(updatedTasks.data ?? []);
    setIsLoading(false);
  };

  const handleSetCompleted = async (task: EditStatusTaskType) => {
    await setTaskCompleted(task);
    console.log("taskid:", task._id);
    console.log("status:", task.status);
    fetchTasks();
  };

  const handleDeleteTask = async (task: TaskType) => {
    await deleteTask(task._id);
    console.log("task deletada com o id", task._id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mt-5 w-100 transition-all duration-300">
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
        <>
          <TaskModal onAddTask={fetchTasks} />

          <ul className="flex flex-col gap-2 rounded-lg p-4 shadow-lg transition-opacity duration-300">
            {tasks
              .sort((a, b) => Number(a.status) - Number(b.status))
              .map((task) => (
                <li
                  key={task._id}
                  className={`flex items-center justify-between gap-5 px-4 py-2 rounded-lg ${
                    task.status ? "bg-zinc-500" : "bg-zinc-800"
                  }`}
                >
                  <span
                    className={`${task.status ? "line-through italic" : ""}`}
                  >
                    {task.title}
                  </span>

                  <span
                    className={`${task.status ? "line-through italic" : ""}`}
                  >
                    {task.description ? task.description : "Sem descrição"}
                  </span>

                  <span
                    className={`${task.status ? "line-through italic" : ""}`}
                  >
                    {task.category ? task.category : "Sem categoria"}
                  </span>

                  <div className="flex items-center gap-3">
                    <BadgeCheck
                      onClick={async () => {
                        const newStatus = !task.status;
                        await handleSetCompleted({
                          _id: task._id,
                          status: newStatus,
                        });

                        const bgColor = newStatus
                          ? "bg-green-600"
                          : "bg-yellow-500";
                        const textColor = newStatus
                          ? "text-white"
                          : "text-black";
                        const message = newStatus
                          ? "Tarefa marcada como concluída"
                          : "Tarefa marcada como pendente";

                        toast.custom((t) => (
                          <div
                            className={`${bgColor} ${textColor} px-6 py-4 rounded-lg shadow-lg flex flex-row items-center justify-center text-center w-full max-w-sm gap-2`}
                            onClick={() => toast.dismiss(t)}
                          >
                            <BadgeCheck
                              size={20}
                              strokeWidth={1.5}
                              className={textColor}
                            />
                            <span className="text-sm font-medium">
                              {message}
                            </span>
                          </div>
                        ));
                      }}
                      className="w-5 h-5 cursor-pointer"
                      color="#3de1de"
                      strokeWidth={0.75}
                    />

                    <Trash2
                      onClick={async () => {
                        try {
                          await handleDeleteTask(task);
                          toast.custom((t) => (
                            <div
                              className="bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg flex flex-row items-center justify-center text-center w-full max-w-sm gap-2"
                              onClick={() => toast.dismiss(t)}
                            >
                              <BadgeCheck
                                size={20}
                                strokeWidth={1.5}
                                className="text-white"
                              />
                              <span className="text-sm font-medium">
                                Task removida com sucesso
                              </span>
                            </div>
                          ));
                        } catch (e) {
                          toast.error("Erro ao excluir a tarefa.");
                          console.error(e);
                        }
                      }}
                      className="w-5 h-5 cursor-pointer"
                      color="#bd2828"
                      strokeWidth={1.5}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};
