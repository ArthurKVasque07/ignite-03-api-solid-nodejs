import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuery = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuery.parse(request.query);

  const fetchCheckinHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchCheckinHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
