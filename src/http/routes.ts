import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register);

  // rota como session para ficar mais semântico,
  // estou criando uma sessão, invés de estou criando uma autenticação
  app.post("/session", authenticate);
}
