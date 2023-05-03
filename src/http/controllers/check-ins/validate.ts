import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const checkInGymUseCase = makeValidateCheckInUseCase();

  await checkInGymUseCase.execute({
    checkInId,
  });

  // 204 não é criação como 201
  return reply.status(204).send();
}
