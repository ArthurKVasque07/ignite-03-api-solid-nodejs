import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);

  app.get("/me", profile);

  // rota como session para ficar mais semântico,
  // estou criando uma sessão, invés de estou criando uma autenticação
  app.post("/session", authenticate);
}
