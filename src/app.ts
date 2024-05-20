import express, { json } from "express";
import helmet from "helmet";
import { taskRouter, categoryRouter } from "./routers";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(helmet());

app.use(express.json());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(handleErrors.execute);