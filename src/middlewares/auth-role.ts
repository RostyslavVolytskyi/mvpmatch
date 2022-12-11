import { Request, Response, NextFunction } from "express";
import { UserRole } from "../constants";
import { BadRequestError } from "../errors/bad-request-error";

export const authRole =
    (role: UserRole) => (req: Request, res: Response, next: NextFunction) => {
        if (req.currentUser?.role !== role) {
            throw new BadRequestError(`Not allowed with '${role}' role`);
        }

        next();
    };
