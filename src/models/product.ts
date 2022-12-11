import mongoose, { Schema } from "mongoose";

interface ProductAttrs {
    amountAvailable: number;
    cost: number;
    productName: string;
    sellerId: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attrs: ProductAttrs): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
    amountAvailable: number;
    cost: number;
    productName: string;
    sellerId: string;
}

const productSchema = new mongoose.Schema(
    {
        amountAvailable: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
            validate: {
                validator: (cost: number) => cost % 5 === 0,
                message: (props: any) => "should be in multiples of 5",
            },
        },
        productName: {
            type: String,
            required: true,
        },
        sellerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
    "Product",
    productSchema
);

export { Product };
