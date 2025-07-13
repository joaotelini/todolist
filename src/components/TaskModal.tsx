"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useState } from "react";
import { toast } from "sonner";
import { NewTaskType } from "@/types/TaskType";
import { saveTasksData } from "@/services/TaskApi";

export const TaskModal = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(task);
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title.trim()) {
      return alert("Preencha o campo título");
    }

    if (!task.description.trim()) {
      return alert("Preencha o campo descrição");
    }

    const newTask: NewTaskType = {
      title: task.title,
      description: task.description,
      category: task.category,
    };

    try {
      await saveTasksData(newTask);
      setTask({ title: "", description: "", category: "" });
      toast.success("Tarefa adicionada com sucesso!");
    } catch (e) {
      console.error("Erro ao salvar a tarefa", e);
      toast.error("Erro ao adicionar a tarefa");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          Add new Task
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] bg-black text-white">
        <SheetHeader>
          <SheetTitle className="text-white">New task</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Adicione uma nova tarefa à sua lista de tarefas.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Title</Label>
            <Input
              value={task.title}
              onChange={handleChange}
              name="title"
              id="sheet-demo-title"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Description</Label>
            <Input
              value={task.description}
              onChange={handleChange}
              name="description"
              id="sheet-demo-title"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Category</Label>
            <Select
              value={task.category}
              onValueChange={(value) =>
                setTask((prev) => ({ ...prev, category: value }))
              }
              defaultValue="Select a category"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectGroup>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button
            onClick={handleAddTask}
            type="submit"
            className="cursor-pointer"
            variant={"default"}
          >
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="text-black cursor-pointer">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
