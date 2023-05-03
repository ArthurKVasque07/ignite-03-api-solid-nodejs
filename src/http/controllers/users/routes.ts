import { FastifyInstance } from "fastify";
import { register } from "../users/register";
import { authenticate } from "../users/authenticate";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { profile } from "../users/profile";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
