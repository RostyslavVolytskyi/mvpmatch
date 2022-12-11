import express, { Request, Response } from "express";
import { body } from "express-validator";
import { ROLES } from "../../constants";
import { authRole } from "../../middlewares/auth-role";
import { validateRequest } from "../../middlewares/validate-request";
import { Product, ProductDoc } from "../../models/product";

const router = express.Router();

router.post(
    "/api/products/update",
    [body("productId").notEmpty().withMessage("productId must be provided")],
    validateRequest,
    authRole(ROLES.SELLER),
    async (req: Request, res: Response) => {
        const { productId, amountAvailable, cost, productName } = req.body;

        const payload = {} as Partial<ProductDoc>;
        if (amountAvailable) {
            payload.amountAvailable = amountAvailable;
        }
        if (cost) {
            payload.cost = cost;
        }
        if (productName) {
            payload.productName = productName;
        }

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                payload,
                {
                    returnDocument: "after",
                }
            );
            res.status(200).send(updatedProduct);
        } catch (err) {
            console.error(err);
        }
    }
);

export { router as updateProductRouter };
