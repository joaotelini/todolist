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

    if (!userId) {
      return NextResponse.json(
        { error: true, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const response = await getTasksService(userId);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro no getTasksController:", error.message);
    } else {
      console.error("Erro inesperado no getTasksController:");
    }
    return Response.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Erro inesperado",
      },
      { status: 500 }
    );
  }
};

export const createTaskController = async (request: NextRequest) => {
  try {
    const decoded = await getUserFromToken();
    if (!decoded) {
      return NextResponse.json(
        { error: true, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category } = body;

    if (!title) {
      return NextResponse.json(
        { error: true, message: "Título ausente" },
        { status: 400 }
      );
    }
    if (!description) {
      return NextResponse.json(
        { error: true, message: "Desc ausente" },
        { status: 400 }
      );
    }
    if (!category) {
      return NextResponse.json(
        { error: true, message: "Cat ausente" },
        { status: 400 }
      );
    }

    const response = await createTaskService(title, description, category, decoded);
    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro no createTaskController:", error.message);
    } else {
      console.error("Erro inesperado no createTaskController:");
    }
    return Response.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Erro inesperado",
      },
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

    if (!decoded) {
      return NextResponse.json(
        { error: true, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro no editTaskController:", error.message);
    } else {
      console.error("Erro inesperado no editTaskController:");
    }
    return Response.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Erro inesperado",
      },
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

    if (!decoded) {
      return NextResponse.json(
        { error: true, message: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    const response = await deleteTaskService(taskId, decoded);
    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro no loginController:", error.message);
    } else {
      console.error("Erro inesperado no deleteTaskController:");
    }
    return Response.json(
      {
        error: true,
        message: error instanceof Error ? error.message : "Erro inesperado",
      },
      { status: 500 }
    );
  }
};
