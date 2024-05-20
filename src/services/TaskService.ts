import { Task, TaskCreate, TaskUpdate, TaskRetrieve } from "../interfaces";
import { prisma } from "../database/prisma";
import { taskSchema, TaskRetrieveSchema, TaskRetrieveSchemaByCat } from "../schemas";


export class TaskService {
    private task = prisma.task;

    public list = async (categoryName?: string): Promise<Array<Task>> => {
        if (categoryName) { 
            const categoryTasks = await this.task.findMany({
                where: { category: {name: {equals: categoryName, mode: "insensitive"} }, },
                include: { category: true } 
            }); 

        return TaskRetrieveSchemaByCat.array().parse(categoryTasks);
        }

        const tasks = await this.task.findMany({
            include: { category: true },
        });

        return TaskRetrieveSchema.array().parse(tasks);
    };

    public retrieve = async (taskId: number): Promise<TaskRetrieve> => {
        console.log(taskId);
        const task = await this.task.findUnique( {
            where: { id: taskId },
            include: { category: true },
          });

        return TaskRetrieveSchema.parse(task);
    };

    public create = async (payload: TaskCreate): Promise<Task> => {
        const newTask = await prisma.task.create({ data: payload });
    
        return taskSchema.parse(newTask);
    };

    public update = async (taskId: number, payload: TaskUpdate): Promise<Task> => {
        const updatedTask = await prisma.task.update({ where: {id: taskId}, data: payload });

        return taskSchema.parse(updatedTask);
    };

    public delete = async (taskId: number): Promise<void> => {
        await prisma.task.delete({ where: { id: taskId } });
    };

}