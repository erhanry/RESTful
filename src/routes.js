import { Router } from "express";

import productController from "./controllers/productController.js";
import categoryController from "./controllers/categoryController.js";
import userController from "./controllers/userController.js";

const routes = Router();

routes.get("/", (req, res) => res.json({ message: "RESTful services it's working!" }));

routes.use("/api/product", productController);
routes.use("/api/category", categoryController);
routes.use("/api/users", userController);

routes.all("*", (req, res) => res.status(404).json({ message: "Resource not found" }));

export default routes;
