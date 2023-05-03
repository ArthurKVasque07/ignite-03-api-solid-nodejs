import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Profile (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip("sould be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "Arthur e2e",
      email: "arthur@e2e.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/session").send({
      email: "arthur@e2e.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "arthur@e2e.com",
      })
    );
  });
});
