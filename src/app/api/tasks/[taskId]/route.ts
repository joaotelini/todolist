import { deleteTaskController, editTaskController } from "../controller";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ taskId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  return editTaskController(request, { params });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const params = await context.params;
  return deleteTaskController(request, { params });
}
