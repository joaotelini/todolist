export type TaskType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: boolean;
};

export type NewTaskType = Omit<TaskType, "_id" | "status">;

export type EditStatusTaskType = Omit<
  TaskType,
  "title" | "description" | "category"
>;

export type TaskApiResponse = {
  error: boolean;
  message?: string;
  data?: TaskType[];
};
