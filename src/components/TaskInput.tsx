"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Task } from "@/types/TaskType";

export const TaskInput = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return alert("Preencha o campo");
    }

    const newTask = { id: tasks.length + 1, taskName: taskName };
    const updateTask = [...tasks, newTask];
    setTasks(updateTask);
    localStorage.setItem("tasks", JSON.stringify(updateTask));
    setTaskName("");
    // Enviar evento de atualizacao de task
    window.dispatchEvent(new Event("tasksUpdated"));
  };

  return (
    <div className="flex justify-center items-center gap-3">
      <form onSubmit={handleAddTask} className="flex flex-row">
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="text-white"
          type="text"
          placeholder="Digite a tarefa"
        />
        <Button
          className="font-normal ml-5 w-20 p-4"
          type="submit"
          variant="default"
        >
          Add
        </Button>
      </form>
    </div>
  );
};
