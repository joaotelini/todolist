export type TaskType = {
  _id: string;
  title: string;
  status: boolean;
};

export type NewTaskType = Omit<TaskType, "_id" | "status">;

export type EditStatusTaskType = Omit<TaskType, "title">;

export type TaskApiResponse = {
  error: boolean;
  message?: string;
  data?: TaskType[];
};
