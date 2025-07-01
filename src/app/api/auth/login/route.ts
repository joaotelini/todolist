import { loginController } from "./controller";

export const POST = async (request: Request) => {
  return loginController(request);
};
