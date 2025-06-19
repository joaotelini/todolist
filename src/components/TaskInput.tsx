"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { saveTasksData } from "@/services/TaskApi";

type TaskInputProps = {
  onAddTask: () => void;
};

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return alert("Preencha o campo");
    }

    const newTask = { title: taskName, status: false };

    try {
      await saveTasksData(newTask);
      onAddTask();
      setTaskName("");
    } catch (e) {
      return console.error("Erro ao salvar a tarefa pelo front", e);
    }

    setTaskName("");
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
