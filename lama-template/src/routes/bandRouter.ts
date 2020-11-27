import express from "express";
import { BandController } from "../controller/BandController";

export const bandRouter = express.Router();

bandRouter.post("/band/create", BandController.createBand);
bandRouter.get("/band/:id", BandController.getBandById);