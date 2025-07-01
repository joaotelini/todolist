import { signinService } from "./service";

export const signinController = async (request: Request) => {
  try {
    const body = await request.json();
    const response = await signinService(
      body.fullname,
      body.email,
      body.password
    );

    return Response.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Erro no controller:", error);
    return Response.json(
      {
        error: true,
        message: error.message || "Erro desconhecido",
      },
      { status: 500 }
    );
  }
};
