export class Chatter {
    constructor(public id:number,
        private name:string,
        private username:string,
        public friends: Chatter[],
        public avatars: string[],
        public currentavatar: string){
       
    }
  
}
