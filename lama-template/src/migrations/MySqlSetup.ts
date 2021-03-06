import { BaseDatabase } from "../data/BaseDatabase";

export default class MySqlSetup extends BaseDatabase {

  async createTables():Promise<void> {
    
    try {

      await this.getConnection().raw(`
        CREATE TABLE IF NOT EXISTS LAMA_Users (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
        );
      `);

      await this.getConnection()
        .raw(`
          CREATE TABLE IF NOT EXISTS LAMA_Bands (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            music_genre VARCHAR(255) NOT NULL,
            responsible VARCHAR(255) UNIQUE NOT NULL 
          );
        `);
        
      await this.getConnection()
      .raw(`
        CREATE TABLE IF NOT EXISTS LAMA_Shows (
          id VARCHAR(255) PRIMARY KEY,
          week_day VARCHAR(255) NOT NULL,
          start_time INT NOT NULL,
          end_time INT NOT NULL,
          band_id VARCHAR(255) NOT NULL,
          FOREIGN KEY(band_id) REFERENCES LAMA_Bands(id)
        );
      `);
      
      console.log("MySql setup completed!");
    } catch (error) {
      console.log(error.message);
    }

    await BaseDatabase.destroyConnection();
    
  }
  
}
  
new MySqlSetup().createTables();