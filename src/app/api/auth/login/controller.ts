import { loginService } from "./service";

export const loginController = async (request: Request) => {
  try {
    const body = await request.json();
    const response = await loginService(body.email, body.password);
    return Response.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Erro no loginController:", error);
    return Response.json(
      {
        error: true,
        message: error.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
};
