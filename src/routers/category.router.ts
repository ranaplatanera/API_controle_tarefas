import { Router } from "express";
import { CategoryController } from "../controllers";
import { ensure, ensureCategory } from "../middlewares";
import { categoryCreateSchema } from "../schemas";

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post("", ensure.bodyIsValid(categoryCreateSchema), categoryController.create);
categoryRouter.use("/:id", ensureCategory.idValid);
categoryRouter.delete("/:id", categoryController.delete)