import jwt from "jsonwebtoken";
import { UserDoc } from "../models/user";
import { Request } from "express";

export const generateJWTToken = (user: UserDoc, req: Request) => {
    // Generate JWT
    const userJwt = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt,
    };
};
