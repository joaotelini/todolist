import { deleteTaskController, editTaskController } from "../controller";
import type { NextRequest } from "next/server";

interface Params {
  params: {
    taskId: string;
  };
}

export async function PATCH(request: NextRequest, context: Params) {
  return editTaskController(request, context);
}

export async function DELETE(request: NextRequest, context: Params) {
  return deleteTaskController(request, context);
}
