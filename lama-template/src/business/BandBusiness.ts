import { BandDatabase } from "../data/BandDatabase";
import { Band, BandInput } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
    static getBandById(id: string, token: string): any {
        throw new Error("Method not implemented.");
    }
    static createBand(input: BandInput, token: string) {
        throw new Error("Method not implemented.");
    }

    constructor(
        private authenticator: Authenticator,
        private idGenerator: IdGenerator,
        private bandDataBase: BandDatabase
    ) {}

    public async createBand(
        token: string,
        name: string,
        music_genre: string,
        responsible: string
        ) {

        const userData = this.authenticator.getData(token)
        const id = this.idGenerator.generate()

        if(!name || !music_genre || !responsible){
            throw new Error("Preencha todas as informações")
        }

        if(userData.role !== UserRole.ADMIN){
            throw new Error("Apenas administradores podem cadastrar bandas")
        }

        await this.bandDataBase.createBand(
            id,
            name,
            music_genre,
            responsible
        )
    }

    public async getBandById(input: Band): Promise<Band[]>{

        const bandDatabase = new BandDatabase();
        return await bandDatabase.getBandById(input.id);

    }
}