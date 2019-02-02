import { Chatter } from "./chatter";

export class Room {
    constructor(
        public pid:number,
        public name:string,
        public users:Chatter[], 
        public verlauf: string[],
        public background: string,
        public backgroundeffect: string) {
       
    }
}
