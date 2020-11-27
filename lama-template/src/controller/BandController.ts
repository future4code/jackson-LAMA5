import { BandBusiness } from "../business/BandBusiness";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Band, BandInput } from "../model/Band";

export class BandController {
    BandBusiness: any;

    public async createBand(
        req: Request,
        res: Response
        ) {

        try{

            const token: string = req.headers.authorization as string;

            const input: BandInput = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const band = await BandBusiness.createBand(input, token);

            res.status(200).send({
                message: "Banda cadastrada com sucesso!",
                band
            });


        } catch(error){
            res.status(400).send({error: error.message});
        }
        await BaseDatabase.destroyConnection();
    }

    public async getBandById(
        req: Request, 
        res: Response
        ) {

        try {

            const token: string = req.headers.authorization as string
    
            const id: string  = req.params.id
    
            const band: Band = await BandBusiness.getBandById(id, token);
            
            res.status(200).send({
                message: "Banda cadastrada com sucesso!",
                band
            });

        } catch (error) {
            res.status(400).send({error: error.message});
        } 
        await BaseDatabase.destroyConnection()
    }
}