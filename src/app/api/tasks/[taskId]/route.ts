import { deleteTaskController, editTaskController } from "../controller";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  return editTaskController(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  return deleteTaskController(request, context);
}
