"use client"
import { Checkbox } from "./ui/checkbox";


export const TaskList = () => {
  return (
    <div className="flex flex-col justify-center text-center mt-15">
      <h3>Lista de Tarefas</h3>
      <ul>
        <li>Tarefa <Checkbox></Checkbox></li>
        <li>Tarefa</li>
        <li>Tarefa</li>
        <li>Tarefa</li>
        <li>Tarefa</li>
        <li>Tarefa</li>
      </ul>
    </div>
  );
};
