// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { Room } from './room';
// import { Observable, of, from } from 'rxjs';
// import { Room } from './room';



// @Injectable({
//   providedIn: 'root'
// })
// export class RoomService {

//   private readonly url = '';

//   constructor() {
//     this.mockFill(this.roommap)
//   }

//   private roommap= new Map();

//   mockFill(store){

//     store.set(1, new Room(1,"Room1",[new Room(6,"test6","realtest6",null,null,null),new Room(6,"test6","realtest6",null,null,null)],["hi","hallo"],null));
//     store.set(2, new Room(2,"Room2",null,["hi2","hallo"],"./assets/backgrounds/background1.png"));
//     store.set(3, new Room(3,"Room3",null,["hi3","hallo"],null));
//     store.set(4, new Room(4,"Room4",[new Room(4,"test4","realtest4",null,null,null)],["hi4","hallo"],null));
//   }
//   public get(id: number): Observable<Room> {
//     this.mockFill(this.roommap)
//     return this.roommap.get(id);
//   }

//   public getAll(): Observable<Room[]> {
//     this.mockFill(this.roommap)
//     return of(Array.from(this.roommap.values()));
//     //return  Array.from(this.roommap.values());
//   }

  

//   // constructor(private readonly _httpClient: HttpClient) {
//   // }

//   // public get(id: number): Observable<Room> {
//   //   return this._httpClient.get<Room>(`${this.url}/todos/${id}`);
//   // }

//   // public getAll(): Observable<Room[]> {
//   //   return this._httpClient.get<Room[]>(`${this.url}/todos`);
//   // }

//   // public create(todo: Room): Observable<Room> {
//   //   return this._httpClient.post<Room>(`${this.url}/todos`, todo);
//   // }

//   // public update(todo: Room): Observable<void> {
//   //   return this._httpClient.put<void>(`${this.url}/todos/${todo.id}`, todo);
//   // }

//   // public delete(id: number): Observable<any> {
//   //   return this._httpClient.delete<void>(`${this.url}/todos/${id}`);
//   // }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Room } from './room';
import { Message } from './message';





@Injectable({ providedIn: 'root' })
export class RoomService {
    constructor(private http: HttpClient) { }

   
    getAll() :Observable<Room[]>  {
        // let body = new FormData();
        // body.append('message', 'Joele');
        // console.log('stri')
        // this.http.post(`http://localhost:4000/rooms/1/messages`,new Message("abc")).subscribe(data => {
        //     console.log(data);
        //  },
        //  err => {
        //       console.log('Error: ' + err.error);
        //   });
        return this.http.get<Room[]>(`${environment.config.apiUrl}/rooms`);
        
        
    }

    getById(id: number): Observable<Room>  {
        // console.log("d")
        // console.log(id)
        return this.http.get<Room>(`${environment.config.apiUrl}/rooms/${id}`);
    }

    public getTest(): string {
 
      return "test";
    }

    public pushMessage(room: Room, message:string)  {
        // console.log('mmmmm')
        // console.log(""+message)
        // let mym=new Message("jdjdjdd");
        // console.log(mym)
        // console.log(room.pid)
        // let pid= room.pid
        // let body = new FormData();
        // body.append('message', 'Joele');
        // console.log(`${environment.config.apiUrl}/rooms/${pid}/messages`)
        // console.log(this.http.post<void>(`${environment.config.apiUrl}/rooms/1/messages`, body));
        this.http.post<any>(`${environment.config.apiUrl}/rooms/${room.pid}/messages`, message).subscribe();
    }

    public getMe(): Observable<Room> {
     
      return this.http.get<Room>(`${environment.config.apiUrl}/rooms/current`);
}

   
}
