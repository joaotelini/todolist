"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { getTasksData } from "@/data/TaskData";
import { v4 } from "uuid";

export const TaskInput = () => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return alert("Preencha o campo");
    }

    const dataOldTasks = getTasksData();

    const newTask = { id: v4(), taskName: taskName, completed: false };
    const updateTask = [...dataOldTasks, newTask];

    try {
      localStorage.setItem("tasks", JSON.stringify(updateTask));
    } catch (e) {
      console.error("Erro ao salvar no localStorage", e);
    }

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
          disabled={!taskName.trim()}
        >
          Add
        </Button>
      </form>
    </div>
  );
};
