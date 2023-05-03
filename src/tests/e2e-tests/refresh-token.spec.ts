import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Refresh token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("sould be able to refresh token", async () => {
    await request(app.server).patch("/token/refresh").send({
      name: "Arthur e2e",
      email: "arthur@e2e.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/session").send({
      email: "arthur@e2e.com",
      password: "123456",
    });

    console.log(authResponse.get("Set-Cookie"));

    const cookies = authResponse.get("set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
