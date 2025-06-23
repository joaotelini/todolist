export type Task = {
  _id: string;
  title: string;
  status: boolean;
};

export type NewTask = Omit<Task, "_id" | "status">;
