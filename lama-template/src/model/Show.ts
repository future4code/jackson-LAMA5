
export class Show {
    constructor(
      private id: string,
      private week_day: WeekDay,
      private start_time: number,
      private end_time: number,
      private band_id: string
    ) {}
  
    public getId(){
        return this.id
    }

    public getWeekDay(){
        return this.week_day
    }

    public getStartTime(){
        return this.start_time
    }

    public getEndTime(){
        return this.end_time
    }

    public getBandId(){
        return this.band_id
    }
  
    static stringToWeekDay(input: string): WeekDay {
      switch (input) {
        case "FRIDAY":
          return WeekDay.FRIDAY;
        case "SATURDAY":
          return WeekDay.SATURDAY;
        case "SUNDAY":
          return WeekDay.SUNDAY;
        default:
          throw new Error("Invalid week day");
      }
    }
}
  
export interface ShowInput {
    band_id: string;
    week_day: string;
    start_time: number;
    end_time: number;
}
  
export enum WeekDay {
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY"
}