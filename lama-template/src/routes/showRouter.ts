
import express from "express";
import { ShowController } from "../controller/ShowController";


export const showRouter = express.Router();

showRouter.post("/show/create", ShowController.createShow);
showRouter.get("/show/:date", ShowController.getByDay);