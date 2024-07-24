import { env, exit, cwd } from "node:process";
import { join as path_join } from "node:path";

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import routes from "./routes.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

// Loads environment variables
const APP_PORT = env.APP_PORT || 5000;
const MONGO_HOST = env.MONGO_HOST || "localhost";
const MONGO_PORT = env.MONGO_PORT || 27017;
const MONGO_DATABASE = env.MONGO_DATABASE || "electronics";

async function start() {
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`);
    } catch {
        return exit(1);
    }

    // Local Variables
    const app = express();

    // Middlewares
    app.use(express.static(path_join(cwd(), "src", "public")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(corsMiddleware());
    app.use(authMiddleware());

    // Routes
    app.use(routes);

    app.listen(APP_PORT, () => console.log(`REST Service started on port http://localhost:${APP_PORT}`));
}

// Starting Express APP
start();

// mongoose message
mongoose.connection
    .on("connected", () => console.log(`Successfully connected to "${MONGO_DATABASE}" database!`))
    .on("disconnected", () => console.log("DB is disconnected!"))
    .on("error", (err) => {
        throw err;
    });
