"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { saveTasksData } from "@/services/TaskApi";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";
import { NewTask } from "@/types/TaskType";

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

    const newTask: NewTask = { title: taskName };

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
          className="font-normal ml-5 w-20 p-4 cursor-pointer"
          onClick={() => {
            toast.custom((t) => (
              <div
                className="bg-zinc-800 text-white px-6 py-4 rounded-lg shadow-lg flex flex-row items-center justify-center text-center w-full max-w-sm gap-2"
                onClick={() => toast.dismiss(t)}
              >
                <BadgeCheck
                  size={20}
                  strokeWidth={1.5}
                  className="text-emerald-400"
                />
                <span className="text-sm font-medium">
                  Task adicionada com sucesso
                </span>
              </div>
            ));
          }}
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
