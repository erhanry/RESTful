import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import categoryService from "../services/categoryService.js";
import errorMapper from "../util/errorMapper.js";

const categoryController = Router();

const isOwner = () => async (req, res, next) => {
    const id = req.params.id;
    const owner = req.user?._id;

    try {
        const result = await categoryService.getOne(id);

        if (result.owner == owner) {
            req.category = result;

            next();
        }
    } catch {
        res.status(404).json({ message: "Category not found" });
    }
};

categoryController.get("/", async (req, res) => {
    try {
        const categorys = await categoryService.getAll();

        res.status(200).json(categorys);
    } catch {
        res.status(400).json({ message: "Bad request" });
    }
});

categoryController.post("/", isAuth(), async (req, res) => {
    const newData = req.body;
    const owner = req.user._id;

    try {
        const result = await categoryService.create({ ...newData, owner });
        res.status(200).json(result);
    } catch (err) {
        const message = errorMapper(err);
        res.status(400).json({ message });
    }
});

categoryController.put("/:id", isAuth(), isOwner(), async (req, res) => {
    const newData = req.body;
    const oldData = req.category;

    try {
        const result = await categoryService.update(oldData._id, newData, oldData.owner);

        res.status(200).json(result);
    } catch (err) {
        const message = errorMapper(err);
        res.status(400).json({ message });
    }
});

categoryController.delete("/:id", isAuth(), isOwner(), async (req, res) => {
    const categoryId = req.params.id;
    const ownerId = req.user._id;

    try {
        const result = await categoryService.del(categoryId, ownerId);

        res.json(result);
    } catch {
        res.status(404).json({ message: "Category not found" });
    }
});

export default categoryController;
