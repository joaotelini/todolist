import { signinController } from "./controller";

export const POST = async (request: Request) => {
  return signinController(request);
};
