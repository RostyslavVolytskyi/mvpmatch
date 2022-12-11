import { app } from "./app";
import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.DB_PATH) {
        throw new Error("DB_PATH must be defined");
    }

    try {
        await mongoose.connect(process.env.DB_PATH, {});
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log("Listening on port 3000!!!!!!!!");
    });
};

start();
