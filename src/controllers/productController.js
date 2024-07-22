import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import productService from "../services/productService.js";
import errorMapper from "../util/errorMapper.js";

const productController = Router();

const isOwner = () => async (req, res, next) => {
    const id = req.params.id;
    const owner = req.user?._id;

    try {
        const result = await productService.getOne(id);

        if (result.owner == owner) {
            req.product = result;
            next();
        }
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
};

productController.get("/", async (req, res) => {
    try {
        const product = await productService.getAll();

        res.status(200).json(product);
    } catch {
        res.status(400).json({ message: "Bad request" });
    }
});

productController.post("/", isAuth(), async (req, res) => {
    const newData = req.body;
    const owner = req.user._id;

    try {
        const result = await productService.create({ ...newData, owner });
        res.status(200).json(result);
    } catch (err) {
        const message = errorMapper(err);
        res.status(400).json({ message });
    }
});

productController.get("/search", async (req, res) => {
    const searchParam = req.query;

    try {
        const result = await productService.search(searchParam);

        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.get("/last/:limit", async (req, res) => {
    const limit = req.params.limit;

    try {
        const result = await productService.getLast(limit);

        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.get("/:id/details", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await productService.getOneDetailed(id);

        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.get("/count", async (req, res) => {
    try {
        const count = await productService.countProduct();

        res.status(200).json({ count });
    } catch {
        res.status(400).json({ message: "Bad request" });
    }
});

productController.get("/:limit/limit/:page/page", async (req, res) => {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);

    try {
        const result = await productService.pagination(limit, page);

        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await productService.getOne(id);

        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.get("/category/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await productService.getCategory(id);
        res.status(200).json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

productController.put("/bought/:id", isAuth(), async (req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    try {
        const result = await productService.bought(productId, userId);

        res.status(200).json(result);
    } catch (err) {
        const message = errorMapper(err);
        res.status(400).json({ message });
    }
});

productController.put("/:id", isAuth(), isOwner(), async (req, res) => {
    const newData = req.body;
    const oldData = req.product;

    try {
        const result = await productService.update(oldData._id, newData, oldData.owner);

        res.status(200).json(result);
    } catch {
        res.status(400).json({ message: "Request error" });
    }
});

productController.delete("/:id", isAuth(), isOwner(), async (req, res) => {
    const productId = req.params.id;
    const ownerId = req.user._id;

    try {
        const result = await productService.del(productId, ownerId);

        res.json(result);
    } catch {
        res.status(404).json({ message: "Product not found" });
    }
});

export default productController;
