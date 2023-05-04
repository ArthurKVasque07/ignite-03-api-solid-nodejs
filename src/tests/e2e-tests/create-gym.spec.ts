import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("sould be able to create a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const reponse = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Javascript Gym",
        phone: "13981818181",
        latitude: -24.009992,
        longitude: -46.4073557,
      });

    expect(reponse.statusCode).toEqual(201);
  });
});
