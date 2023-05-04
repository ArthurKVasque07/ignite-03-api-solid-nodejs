import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("sould be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const { id } = await prisma.gym.create({
      data: {
        title: "Javascritp Gym",
        latitude: -24.009992,
        longitude: -46.4073557,
      },
    });

    const reponse = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
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
