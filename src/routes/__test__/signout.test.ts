import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signing out", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
            deposit: 100,
            role: "seller",
        })
        .expect(201);

    const response = await request(app)
        .post("/api/users/signout")
        .send({})
        .expect(403);

    expect(response.get("Set-Cookie")).toBeUndefined();
});
