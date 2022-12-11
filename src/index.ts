import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import * as dotenv from "dotenv";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { currentUserRouter } from "./routes/auth/current-user";
dotenv.config();

mongoose.set("strictQuery", true);

const app = express();
app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// app.all("*", async (req, res) => {
//     throw new NotFoundError();
// });

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    try {
        await mongoose.connect("mongodb://localhost:27017/mvpmatch", {});
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
};

start();
