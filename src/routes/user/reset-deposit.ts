import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { currentUser } from "../../middlewares/current-user";
import { authRole } from "../../middlewares/auth-role";
import { ROLES } from "../../constants";

const router = express.Router();

router.post(
    "/api/users/deposit-reset",
    currentUser,
    authRole(ROLES.BUYER),
    async (req: Request, res: Response) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.currentUser!.id,
                { deposit: 0 },
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

export { router as resetUserDepositRouter };
