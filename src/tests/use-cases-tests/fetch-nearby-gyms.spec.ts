import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyUseCase } from "@/use-cases/fetch-nearby-gyms";
import { expect, describe, it, beforeEach } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyUseCase;

describe("Fetch Nearby Gyms Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyUseCase(gymsRepository);
  });

  it("should be able to fetch nearby for gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -24.009992,
      longitude: -46.4073557,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -23.7904267,
      longitude: -45.7072699,
    });

    const { gyms } = await sut.execute({
      userLatitude: -24.009992,
      userLongitude: -46.4073557,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
