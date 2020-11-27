import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{

    private static TABLE_NAME = "LAMA_Bands";

    public async createBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
      ): Promise<void> {

        try {
          await this.getConnection()
            .insert({
              id,
              name,
              music_genre,
              responsible
            })
            .into(BandDatabase.TABLE_NAME)

        } catch (error) {
          throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandById(
        id: string
    ): Promise<any> {
        
      try {

          const band = await this.getConnection()
          .select("*")
          .from (BandDatabase.TABLE_NAME)
          .where({ id })
          return band[0][0]
          
      } catch (error) {
          throw new Error(error.sqlMessage || error.message);  
      }
    }
}