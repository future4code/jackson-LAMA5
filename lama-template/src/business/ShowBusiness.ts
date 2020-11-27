import { ShowDatabase } from "../data/ShowDatabase";
import { Show, ShowInput, WeekDay } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


export class ShowBusiness {
    static getShowByDate(id: string, token: string): Show | PromiseLike<Show> {
        throw new Error("Method not implemented.");
    }
    static createShow(input: ShowInput, token: string) {
        throw new Error("Method not implemented.");
    }
    
    constructor(
      private authenticator: Authenticator,
      private idGenerator: IdGenerator,
      private showDataBase: ShowDatabase
    ) {}
  
    public async createShow(
        token: string,
        week_day: WeekDay,
        start_time: number,
        end_time: number,
        band_id: string
        ) {
        
        const userData = this.authenticator.getData(token)
        const id = this.idGenerator.generate()

        if(!week_day || !start_time || !end_time){
            throw new Error("Preencha todas as informações")
        }

        if(userData.role !== UserRole.ADMIN){
            throw new Error("Apenas administradores podem cadastrar bandas")
        }

        if (
            start_time > end_time ||
            start_time < 8 ||
            end_time > 23 ||
            !Number.isInteger(start_time) ||
            !Number.isInteger(end_time)
          ) {
            throw new Error("Horários cadastrados são inválidos");
        }

        await this.showDataBase.createShow(
            id,
            week_day,
            start_time,
            end_time,
            band_id
        )
    }

    public async getShowByDate(input: Show): Promise<Show[]>{

        const showDatabase = new ShowDatabase();
        return await showDatabase.getShowByDate(input.week_day);

    } 
}
  