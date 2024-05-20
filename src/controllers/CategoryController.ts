import { Request, Response } from "express";
import { CategoryService } from "../services";

export class CategoryController {
    private service = new CategoryService();

    public create = async (req: Request, res: Response): Promise<Response> => {
        const category = await this.service.create(req.body);
        return res.status(201).json(category);
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const category = await this.service.delete(Number(req.params.id));
        return res.status(204).json(category);
    };
}