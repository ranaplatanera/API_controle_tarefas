import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";

export class EnsureTaskMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const foundTask = await prisma.task.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!foundTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.locals = { foundTask };

    return next();
  };
}

export const ensureTask = new EnsureTaskMiddleware();