export const GET = async (res: Response) => {
  try {
    const tasks = [
      {
        id: 34,
        name: "Task 1",
        status: false,
      },
      {
        id: 35,
        name: "Task 2",
        status: false,
      },
      {
        id: 36,
        name: "Task 3",
        status: false,
      },
    ];

    return Response.json(tasks, { status: 200 });
  } catch (error) {
    return Response.json({
      error: "Erro ao buscar",
      status: 500,
    });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();

    const newTask = { id: Date.now(), name: body.title, status: body.status };

    return Response.json(newTask, { status: 200 });
  } catch (error) {
    return Response.json({
      error: "Erro ao buscar",
      status: 500,
    });
  }
};

export const PATCH = async (req: Request, res: Response) => {
  try {
    const body = await req.json();

    const newTask = { id: Date.now(), name: body.title, status: body.status };

    return Response.json(newTask, { status: 200 });
  } catch (error) {
    return Response.json({
      error: "Erro ao buscar",
      status: 500,
    });
  }
};
