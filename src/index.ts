import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

// TODO: delete this
app.get("/test", (req, res) => {
    res.status(200).send({ message: "hello there" });
});

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    // try {
    //     await mongoose.connect("mongodb://localhost:27017/mvpmatch", {});
    //     console.log("Connected to MongoDb");
    // } catch (err) {
    //     console.error(err);
    // }

    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
};

start();
