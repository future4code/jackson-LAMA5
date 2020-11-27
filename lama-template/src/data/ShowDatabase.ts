import { Show, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";


export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "LAMA_Shows";

    public async createShow(
        id: string,
        week_day: WeekDay,
        start_time: number,
        end_time: number,
        band_id: string
        ): Promise<void> {
            
            try {
              await this.getConnection()
                .insert({
                  id,
                  week_day,
                  start_time,
                  end_time,
                  band_id
                })
                .into(ShowDatabase.TABLE_NAME)

            } catch (error) {
                throw new Error(error.sqlMessage || error.message);
            }
    }
  
    public async getShowByDate(
        week_day: string,
        ): Promise<any> {

            try {

                const show = await this.getConnection()
                .select("*")
                .from (ShowDatabase.TABLE_NAME)
                .where({ week_day })
                
                return show[0][0]

            } catch (error) {
              throw new Error(error.sqlMessage || error.message);
            }
    }
  
    
}
  
  export default new ShowDatabase();