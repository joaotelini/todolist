import {
  findTasksModel,
  createTaskModel,
  deleteTaskModel,
  editTaskModel,
} from "./model";

export const getTasksService = async (userId: string) => {
  return await findTasksModel(userId);
};

export const createTaskService = async (
  title: string,
  description: string,
  category: string,
  userId: string
) => {
  const doc = {
    title,
    description,
    category,
    userId,
    status: false,
  };
  return await createTaskModel(doc);
};

export const editTaskService = async (
  taskId: string,
  userId: string,
  status: boolean
) => {
  const data = {
    _id: taskId,
    status,
    userId,
  };

  return await editTaskModel(data);
};

export const deleteTaskService = async (taskId: string, userId: string) => {
  const data = { _id: taskId, userId };
  return await deleteTaskModel(data);
};
