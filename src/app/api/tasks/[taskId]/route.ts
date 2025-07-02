import { deleteTaskController, editTaskController } from "../controller";
import { NextRequest } from "next/server";

type RouteParams = {
  params: {
    taskId: string;
  };
};

export async function PATCH(request: NextRequest, context: RouteParams) {
  return editTaskController(request, context);
}

export async function DELETE(request: NextRequest, context: RouteParams) {
  return deleteTaskController(request, context);
}
