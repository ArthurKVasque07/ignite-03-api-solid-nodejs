import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("sould be able to validate a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const user = await prisma.user.findFirstOrThrow();

    const gym = await prisma.gym.create({
      data: {
        title: "Javascritp Gym",
        latitude: -24.009992,
        longitude: -46.4073557,
      },
    });

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    });

    const reponse = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    console.log(reponse.body);
    console.log(checkIn);

    expect(reponse.statusCode).toEqual(204);

    // checkIn = await prisma.checkIn.findFirstOrThrow({
    //   where: {
    //     id: checkIn.id,
    //   },
    // });

    // expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
