import { ShowBusiness } from "../business/ShowBusiness";
import { Show, ShowInput } from "../model/Show";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";


export class ShowController {
    static createShow(arg0: string, createShow: any) {
        throw new Error("Method not implemented.");
    }
    static getByDay(arg0: string, getByDay: any) {
        throw new Error("Method not implemented.");
    }

    ShowBusiness: any

    public async createShow(
        req: Request,
        res: Response
        ) {

        try{

            const token: string = req.headers.authorization as string;

            const input: ShowInput = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            const show = await ShowBusiness.createShow(input, token);

            res.status(200).send({
                message: "Banda cadastrada com sucesso!",
                show
            });


        } catch(error){
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

    public async getShowByDate(
        req: Request, 
        res: Response
        ) {

        try {

            const token: string = req.headers.authorization as string
    
            const id: string  = req.params.id
    
            const show: Show = await ShowBusiness.getShowByDate(id, token);
            
            res.status(200).send({
                show
            });

        } catch (error) {
            res.status(400).send({error: error.message});
        } 
        await BaseDatabase.destroyConnection()
    }

}