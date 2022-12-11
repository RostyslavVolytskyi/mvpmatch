import express, { Request, Response } from "express";
import { body } from "express-validator";

import { User, UserDoc } from "../../models/user";
import { validateRequest } from "../../middlewares/validate-request";
import { currentUser } from "../../middlewares/current-user";
import { authRole } from "../../middlewares/auth-role";
import { ROLES } from "../../constants";

const router = express.Router();

router.post(
    "/api/users/deposit",
    [
        body("deposit")
            .notEmpty()
            .isIn([5, 10, 20, 50, 100])
            .withMessage(
                "deposit must be one of this values: 5, 10, 20, 50, 100"
            ),
    ],
    validateRequest,
    currentUser,
    authRole(ROLES.BUYER),
    async (req: Request, res: Response) => {
        const { deposit } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.currentUser!.id,
                { $inc: { deposit } },
                {
                    returnDocument: "after",
                }
            );
            res.status(200).send(updatedUser);
        } catch (err) {
            console.error(err);
        }
    }
);

export { router as depositUserRouter };
