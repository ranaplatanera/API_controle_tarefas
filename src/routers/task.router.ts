import { Router } from "express";
import { taskController } from "../controllers";
import { ensure, ensureTask, ensureCategory } from "../middlewares";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";

export const taskRouter = Router();


taskRouter.get("", ensureCategory.IsNameValid, ensureCategory.idExists, taskController.list);
taskRouter.use("/:id", ensureTask.idExists);
taskRouter.get("/:id", taskController.retrieve);
//taskRouter.use("", ensureCategory.idExists);
taskRouter.post("", ensure.bodyIsValid(taskCreateSchema), ensureCategory.idExists, taskController.create);
taskRouter.patch("/:id", ensure.bodyIsValid(taskUpdateSchema), taskController.update)
taskRouter.delete("/:id", taskController.delete)