import { z } from "zod";

const categorySchema = z.object({
    id: z.number().positive(),
    name: z.string().max(200),
  });

const categoryCreateSchema = categorySchema.omit({ id: true });

export { categorySchema, categoryCreateSchema };