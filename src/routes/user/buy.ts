import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest } from "../../middlewares/validate-request";
import { ROLES } from "../../constants";
import { authRole } from "../../middlewares/auth-role";
import { User } from "../../models/user";
import { currentUser } from "../../middlewares/current-user";

const router = express.Router();

router.post(
    "/api/buy",
    [
        body("productId").notEmpty().withMessage("productId must be provided"),
        body("amountOfProducts")
            .notEmpty()
            .withMessage("amountOfProducts must be provided"),
    ],
    validateRequest,
    currentUser,
    authRole(ROLES.BUYER),
    async (req: Request, res: Response) => {
        const { productId, amountOfProducts } = req.body;
        console.log(req.currentUser!.id);
        const user = await User.findById(req.currentUser!.id).select("deposit");

        if (user) {
            const { deposit } = user;
            console.log("deposit", deposit);

            try {
                //     const updatedUser = await User.findByIdAndUpdate(userId, payload, {
                //         returnDocument: "after",
                //     });
                res.status(200).send(deposit);
            } catch (err) {
                console.error(err);
            }
        }
    }
);

export { router as buyRouter };
