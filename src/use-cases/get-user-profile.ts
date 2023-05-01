import { IUsersRepository } from "@/repositories/interfaces/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { User } from "@prisma/client";

interface GetUserProfUseCaseRequest {
  userId: string;
}

interface GetUserProfUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfUseCaseRequest): Promise<GetUserProfUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
