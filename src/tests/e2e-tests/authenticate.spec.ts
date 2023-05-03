import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("sould be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "Arthur e2e",
      email: "arthur@e2e.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
