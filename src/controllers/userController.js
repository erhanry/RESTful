import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import userService from "../services/userService.js";
import errorMapper from "../util/errorMapper.js";

const userController = Router();

const AUTH_COOKIE_NAME = "auth-cookie";

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const result = await userService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, result.accessToken);
        res.status(200).json(result.payload);
    } catch (err) {
        const message = errorMapper(err);
        res.status(401).json({ message });
    }
});

userController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const result = await userService.login(userData);
        res.cookie(AUTH_COOKIE_NAME, result.accessToken);
        res.status(200).json(result.payload);
    } catch (err) {
        const message = errorMapper(err);
        res.status(401).json({ message });
    }
});

userController.get("/profile", isAuth(), async (req, res) => {
    const owner = req.user._id;

    try {
        const userData = await userService.getProfile(owner);

        res.status(200).json(userData);
    } catch (err) {
        const message = errorMapper(err);
        res.status(401).json({ message });
    }
});

userController.get("/me", isAuth(), async (req, res) => {
    const owner = req.user._id;

    try {
        const userData = await userService.getMe(owner);

        res.status(200).json(userData);
    } catch (err) {
        const message = errorMapper(err);
        res.status(401).json({ message });
    }
});

userController.get("/logout", (req, res) => {
    userService.logout(req.user.token);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.status(204).end();
});

export default userController;
