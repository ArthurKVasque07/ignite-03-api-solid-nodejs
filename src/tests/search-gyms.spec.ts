import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "@/use-cases/search-gyms";
import { expect, describe, it, beforeEach } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe("Search Gyms Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -24.009992,
      longitude: -46.4073557,
    });

    await gymsRepository.create({
      title: "C# Gym",
      description: null,
      phone: null,
      latitude: -24.009992,
      longitude: -46.4073557,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
    ]);
  });

  it.skip("should be able to fetch pagineted gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `C# Gym ${i}`,
        description: null,
        phone: null,
        latitude: -24.009992,
        longitude: -46.4073557,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "C# Gym 21" }),
      expect.objectContaining({ title: "C# Gym 22" }),
    ]);
  });
});
