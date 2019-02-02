import { Chatter } from "./chatter";
import { Action } from "./action";


export class Message {
    constructor(public content?:string, private from?:Chatter,
        private action?:Action){}
}
