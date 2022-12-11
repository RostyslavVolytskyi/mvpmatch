import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Product } from "../../models/product";
import { authRole } from "../../middlewares/auth-role";
import { ROLES } from "../../constants";

const router = express.Router();

router.post(
    "/api/products/delete",
    [body("productId").notEmpty().withMessage("productId must be provided")],
    validateRequest,
    authRole(ROLES.SELLER),
    async (req: Request, res: Response) => {
        const { productId } = req.body;

        try {
            const deletedProduct = await Product.deleteOne({ _id: productId });
            res.status(200).send(deletedProduct);
        } catch (err) {
            console.error(err);
        }
    }
);

export { router as deleteProductRouter };
