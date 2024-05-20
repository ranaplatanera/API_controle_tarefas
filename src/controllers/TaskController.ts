import { Request, Response } from "express";
import { TaskService } from "../services";


export class TaskController {
    private service = new TaskService();

    public list = async (req: Request, res: Response): Promise<Response> => {        
        const categoryName = req.query.category
        ? String(req.query.category)
        : undefined;

        const tasks = await this.service.list(categoryName);
        return res.status(200).json(tasks);
    };

    public retrieve = async (req: Request, res: Response): Promise<Response> => {
        const taskId = Number(req.params.id);
        const task = await this.service.retrieve(taskId);
        return res.status(200).json(task);
    };

    public create = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.service.create(req.body);
        return res.status(201).json(task);
    };
    
    public update = async (req: Request, res: Response): Promise<Response> => {
        const taskId = Number(req.params.id);
        const task = await this.service.update(taskId, req.body);
        return res.status(200).json(task);
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        const task = await this.service.delete(Number(req.params.id));
        return res.status(204).json(task);
    };
}

export const taskController = new TaskController();