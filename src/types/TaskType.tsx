export type Task = {
  id: number;
  title: string;
  status: Boolean;
};

export type NewTask = Omit<Task, "id">;
