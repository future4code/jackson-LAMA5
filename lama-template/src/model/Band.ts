export class ClassBand {

    public id: string
    public name: string
    public music_genre: string
    public responsible: string

    constructor (
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ) {
        this.id = id
        this.name = name
        this.music_genre = music_genre
        this.responsible = responsible
    }

    public getId(){
        return this.id;
    }

    public getName(){
        return this.name;
    }

    public getGenre(){
        return this.music_genre;
    }

    public getResponsible(){
        return this.responsible;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setGenre(music_genre: string){
        this.music_genre = music_genre;
    }

    setResponsible(responsible: string){
        this.responsible = responsible;
    }
}

export interface Band {
    id: string,
    name: string,
    music_genre: string,
    responsible: string
}

export interface BandInput {
    name: string,
    music_genre: string,
    responsible: string
}