import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jhon123@jhon.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "jhon123@jhon.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(() =>
      sut.execute({
        email: "jhon@jhon.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "jhon@jhon.com",
      password_hash: await hash("123456", 6),
    });

    expect(() =>
      sut.execute({
        email: "jhon@jhon.com",
        password: "14567",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
