import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { register } from "./register";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);

  // rota como session para ficar mais semântico,
  // estou criando uma sessão, invés de estou criando uma autenticação
  app.post("/session", authenticate);

  /** Authenticate */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
