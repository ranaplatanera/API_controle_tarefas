import { z } from "zod";
import { taskSchema,  taskCreateSchema, taskUpdateSchema, TaskRetrieveSchema, TaskRetrieveSchemaByCat} from "../schemas";

type Task = z.infer<typeof taskSchema>;
type TaskCreate = z.infer<typeof taskCreateSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;
type TaskRetrieve = z.infer<typeof TaskRetrieveSchema>;
type TaskRetrieveByCat = z.infer<typeof TaskRetrieveSchemaByCat>;


export { Task, TaskCreate, TaskUpdate, TaskRetrieve, TaskRetrieveByCat };