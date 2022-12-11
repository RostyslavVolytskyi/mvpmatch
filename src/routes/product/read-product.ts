import express, { Request, Response } from "express";
import { Product } from "../../models/product";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).send(allProducts);
    } catch (err) {
        console.error(err);
    }
});

export { router as productsRouter };
