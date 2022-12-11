import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../../models/user";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

router.post(
    "/api/users/delete",
    [body("userId").notEmpty().withMessage("userId must be provided")],
    validateRequest,
    async (req: Request, res: Response) => {
        const { userId } = req.body;

        try {
            const deletedUser = await User.deleteOne({ _id: userId });
            res.status(200).send(deletedUser);
        } catch (err) {
            console.error(err);
        }
    }
);

export { router as deleteUserRouter };
