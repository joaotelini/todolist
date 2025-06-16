"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

let id = 0;

type Task = {
  id: number;
  taskName: string;
};

export const TaskInput = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex justify-center items-center gap-3">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="text-white"
        type="text"
        placeholder="Digite a tarefa"
      />
      <Button
        onClick={() => {
          setTasks([
            ...tasks,
            {
              id: ++id,
              taskName: inputValue,
            },
          ]);
          setInputValue("");
          localStorage.setItem(
            "tasks",
            JSON.stringify([...tasks, { id, taskName: inputValue }])
          );
        }}
        className="font-normal w-20 p-4"
        type="submit"
        variant="default"
      >
        Add
      </Button>
    </div>
  );
};
