import { z } from "zod";
import { categorySchema } from "./category.schemas";

const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().max(200),
    content: z.string(),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish(),
  });

  const taskCreateSchema = taskSchema.omit({ id: true });

  const taskUpdateSchema = taskCreateSchema.partial({ title: true , content: true, finished: true});

  const TaskRetrieveSchema = taskSchema.omit({ categoryId: true }).extend({ category: categorySchema.nullish() });
  
  const TaskRetrieveSchemaByCat = taskSchema.omit({ categoryId: true }).extend({ category: categorySchema });

  export { taskSchema, taskCreateSchema, taskUpdateSchema, TaskRetrieveSchema, TaskRetrieveSchemaByCat };
