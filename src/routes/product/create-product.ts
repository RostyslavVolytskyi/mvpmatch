import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ROLES } from "../../constants";
import { authRole } from "../../middlewares/auth-role";
import { currentUser } from "../../middlewares/current-user";
import { validateRequest } from "../../middlewares/validate-request";
import { Product } from "../../models/product";

const router = express.Router();

router.post(
    "/api/products/create",
    [
        body("amountAvailable")
            .notEmpty()
            .withMessage("amountAvailable should be provided"),
        body("cost").notEmpty().withMessage("cost should be provided"),
        body("productName")
            .notEmpty()
            .withMessage("productName should be provided"),
    ],
    validateRequest,
    currentUser,
    authRole(ROLES.SELLER),
    async (req: Request, res: Response) => {
        const { amountAvailable, cost, productName } = req.body;

        const product = Product.build({
            amountAvailable,
            cost,
            productName,
            sellerId: req.currentUser!.id,
        });
        await product.save();

        res.status(201).send(product);
    }
);

export { router as createProductRouter };
