import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const TaskInput = () => {
  return (
    <div className="flex w-2xl justify-center items-center gap-3">
      <Input className="text-white" type="text" placeholder="Digite a tarefa" />
      <Button className="text-shadow-rose-600 font-normal w-20 p-4" type="submit" variant="default">
        Add
      </Button>
    </div>
  );
};
