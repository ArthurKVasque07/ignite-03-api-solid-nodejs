import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "@/use-cases/create-gym";
import { expect, describe, it, beforeEach } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to gym", async () => {
    const { gym } = await sut.execute({
      title: "JS Gym",
      description: null,
      phone: null,
      latitude: -24.009992,
      longitude: -46.4073557,
    });

    expect(gym?.id).toEqual(expect.any(String));
  });
});
