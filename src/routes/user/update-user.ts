import express, { Request, Response } from "express";
import { body } from "express-validator";

import { User, UserDoc } from "../../models/user";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

router.post(
    "/api/users/update",
    [body("userId").notEmpty().withMessage("userId must be provided")],
    validateRequest,
    async (req: Request, res: Response) => {
        const { userId, email, deposit, role } = req.body;
        const payload = {} as Partial<Omit<UserDoc, "password">>;
        if (deposit) {
            payload.deposit = deposit;
        }
        if (role) {
            payload.role = role;
        }
        if (email) {
            payload.email = email;
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(userId, payload, {
                returnDocument: "after",
            });
            res.status(200).send(updatedUser);
        } catch (err) {
            console.error(err);
        }
    }
);

export { router as updateUserRouter };
