import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/interfaces/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckinUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(private checkInsRespository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkInsRespository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRespository.save(checkIn);

    return {
      checkIn,
    };
  }
}
