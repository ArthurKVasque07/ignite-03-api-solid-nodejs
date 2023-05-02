import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/interfaces/check-ins-repository";

interface CheckinUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckinUseCase {
  constructor(private checkInsRespository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkInsRespository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
