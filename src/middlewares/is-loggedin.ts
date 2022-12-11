import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthFailedError } from "../errors/auth-failed-error";

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        throw new AuthFailedError("Please sign in.");
    }

    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    if (!payload) {
        throw new AuthFailedError(
            "Failed to authentificate user. Please sign in."
        );
    }

    next();
};
