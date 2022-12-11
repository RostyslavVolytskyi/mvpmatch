import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import { generateJWTToken } from "../../utils/generate-jwt-token";
import { ROLES } from "../../constants";

const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
        body("deposit").notEmpty().withMessage("Deposit should be provided"),
        body("role")
            .notEmpty()
            .isIn([ROLES.SELLER, ROLES.BUYER])
            .withMessage("Role should be provided"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, deposit, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }

        const user = User.build({ email, password, deposit, role });
        await user.save();

        generateJWTToken(user, req);

        res.status(201).send(user);
    }
);

export { router as signupRouter };
