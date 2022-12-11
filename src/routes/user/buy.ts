import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { ROLES } from "../../constants";
import { authRole } from "../../middlewares/auth-role";
import { User } from "../../models/user";
import { currentUser } from "../../middlewares/current-user";
import { Product } from "../../models/product";
import { BadRequestError } from "../../errors/bad-request-error";

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
        const user = await User.findById(req.currentUser!.id).select("deposit");
        const product = await Product.findById(productId);

        if (user && product) {
            const { deposit } = user;
            const { amountAvailable, cost } = product;

            if (amountAvailable >= amountOfProducts) {
                const totalPrice = amountOfProducts * cost;
                if (totalPrice < deposit) {
                    const change = deposit - totalPrice;

                    try {
                        const [updatedUser, updatedProduct] = await Promise.all(
                            [
                                User.findByIdAndUpdate(
                                    req.currentUser!.id,
                                    { $inc: { deposit: -totalPrice } },
                                    {
                                        returnDocument: "after",
                                    }
                                ),
                                Product.findByIdAndUpdate(
                                    productId,
                                    {
                                        $inc: {
                                            amountAvailable: -amountOfProducts,
                                        },
                                    },
                                    {
                                        returnDocument: "after",
                                    }
                                ),
                            ]
                        );

                        const payload = {
                            product: updatedProduct,
                            totalPrice,
                            change,
                        };
                        res.status(200).send(payload);
                    } catch (err) {
                        throw new BadRequestError("Failed /buy API");
                    }
                } else {
                    res.status(200).send({
                        success: false,
                        message: "Not enough deposit to buy those products",
                    });
                }
            } else {
                res.status(200).send({
                    success: false,
                    message: "There is no such amount of products",
                });
            }
        }
    }
);

export { router as buyRouter };
