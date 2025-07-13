import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type EditStatusTaskType = {
  _id: string;
  status: boolean;
  userId: string;
};

type CreateTaskType = {
  title: string;
  description: string;
  category: string;
  status: boolean;
  userId: string;
};

type DeleteTaskType = {
  _id: string;
  userId: string;
};

export const findTasksModel = async (userId: string) => {
  const db = await connectDB();

  const response = await db
    .collection("tasks")
    .find({ userId: new ObjectId(String(userId)) })
    .toArray();

  return { error: false, message: "Tarefas encontradas", data: response };
};

export const createTaskModel = async (data: CreateTaskType) => {
  const db = await connectDB();
  const doc = {
    title: data.title,
    description: data.description,
    category: data.category,
    status: false,
    userId: new ObjectId(String(data.userId)),
  };
  const response = await db.collection("tasks").insertOne(doc);
  return response.insertedId;
};

export const editTaskModel = async (data: EditStatusTaskType) => {
  const db = await connectDB();
  const collection = db.collection("tasks");

  const filter = {
    _id: new ObjectId(String(data._id)),
    userId: new ObjectId(String(data.userId)),
  };

  const updateStatus = {
    $set: { status: data.status },
  };

  const response = await collection.updateOne(filter, updateStatus);

  return response;
};

export const deleteTaskModel = async (data: DeleteTaskType) => {
  const db = await connectDB();
  const response = await db.collection("tasks").deleteOne({
    _id: new ObjectId(String(data._id)),
    userId: new ObjectId(String(data.userId)),
  });
  return response.deletedCount;
};
