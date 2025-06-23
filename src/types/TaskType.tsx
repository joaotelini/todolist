export type Task = {
  _id: string;
  title: string;
  status: Boolean;
};

export type NewTask = Omit<Task, "_id" | "status">;
