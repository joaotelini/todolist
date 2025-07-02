import {
  getTasksService,
  createTaskService,
  editTaskService,
  deleteTaskService,
} from "./service";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/app/utils/auth";

export const getTasksController = async () => {
  try {
    const userId = await getUserFromToken();

    const response = await getTasksService(userId);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro em getTasksController:", error);
    return NextResponse.json(
      { error: true, message: error.message || "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
};

export const createTaskController = async (request: NextRequest) => {
  try {
    const decoded = await getUserFromToken();

    const body = await request.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json(
        { error: true, message: "Título ausente" },
        { status: 400 }
      );
    }

    const response = await createTaskService(title, decoded);
    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Erro em createTaskController:", error);
    return NextResponse.json(
      { error: true, message: error.message || "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
};

export const editTaskController = async (
  request: NextRequest,
  { params }: { params: { taskId: string } }
) => {
  try {
    const decoded = await getUserFromToken();
    console.log("Token decodificado:", decoded);

    const taskId = params.taskId;
    const body = await request.json();
    const { status } = body;

    console.log("Dados recebidos:", {
      taskId,
      status,
      userId: decoded,
    });

    if (!taskId || typeof status !== "boolean") {
      return NextResponse.json(
        { error: true, message: "Dados incompletos para edição" },
        { status: 400 }
      );
    }

    const response = await editTaskService(taskId, decoded, status);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Erro em editTaskController:", error);
    return NextResponse.json(
      { error: true, message: error.message || "Erro ao editar tarefa" },
      { status: 500 }
    );
  }
};

export const deleteTaskController = async (
  request: NextRequest,
  { params }: { params: { taskId: string } }
) => {
  try {
    const { taskId } = params;

    if (!taskId) {
      return NextResponse.json(
        { error: true, message: "ID da tarefa não fornecido" },
        { status: 400 }
      );
    }

    const decoded = await getUserFromToken();

    const response = await deleteTaskService(taskId, decoded);
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Erro em deleteTaskController:", error);
    return NextResponse.json(
      { error: true, message: error.message || "Erro ao excluir tarefa" },
      { status: 500 }
    );
  }
};
