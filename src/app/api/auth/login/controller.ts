import { loginService } from "./service";

export const loginController = async (request: Request) => {
  try {
    const body = await request.json();

    const response = await loginService(body.email, body.password);

    return Response.json(response, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro no loginController:", error.message);
    } else {
      console.error("Erro inesperado no loginController:");
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
