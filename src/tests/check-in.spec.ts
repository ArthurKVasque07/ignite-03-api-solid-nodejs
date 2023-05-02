import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckinUseCase } from "@/use-cases/checkin";
import { expect, describe, it, beforeEach } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckinUseCase;

describe("Check ins Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckinUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});