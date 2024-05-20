import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";


export class EnsureCategoryMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.body.categoryId;

    if (!categoryId) { 
      return next();  
    }
    
    const foundCategory = await prisma.category.findFirst({
      where: {
        id: req.body.categoryId,
      },
    });

    if (!foundCategory) { 
      return res.status(404).json({ message: "Category not found" });   
    }
    
    res.locals = { foundCategory };

    return next(); 
  };

  public idValid = async (req: Request, res: Response, next: NextFunction) => {
    const foundCategory = await prisma.category.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.locals = { foundCategory };

    return next();
  };

  public IsNameValid = async (req: Request, res: Response, next: NextFunction) => {
    const categoryName = req.query.category
    ? String(req.query.category)
    : undefined;;
    
    if (categoryName) {
      const foundCategory = await prisma.category.findFirst({
        where: {name: {equals: categoryName, mode: "insensitive"} },

      }); 
  
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.locals = { foundCategory };
    }
    
    return next();
  };

}

export const ensureCategory = new EnsureCategoryMiddleware();