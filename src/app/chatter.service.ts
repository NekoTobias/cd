// import { Injectable } from '@angular/core';
// import { Chatter } from './chatter';
// import { Observable, from, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ChatterService {

//   constructor() {
//     this.mockFill(this.chattermap)
//    }

//   private chattermap= new Map();

//   mockFill(store){
//     var user1 = new Chatter(1,"test1","realtest1",null,null,null)
//     var user2 = new Chatter(2,"test2","realtest2",null,null,null)
//     var user3 = new Chatter(3,"test3","realtest3",null,null,null)
//     var user4 = new Chatter(4,"test4","realtest4",null,null,null)
//     var user5 = new Chatter(5,"test5","realtest5",null,null,null)
//     var user6 = new Chatter(6,"test6","realtest6",null,null,null)
//     user2.friends=[user1,user5];
//     user1.friends=[user6];
//     store.set(1,user1);
//     store.set(2,user2);
//     store.set(3,user3);
//     store.set(4,user4);
//     store.set(5,user5);
//     store.set(6,user6);
// }
// public get(id: number): Observable<Chatter> {
//   return this.chattermap.get(id);
// }

// public getAll(): Observable<Chatter[]> {
//   return of(Array.from(this.chattermap.values()));
// }

// public getMe(): Observable<Chatter> {
//   return of(new Chatter(7,"test7","realtest7",null,["./assets/avatars/ava1.png","./assets/avatars/ava2.png"],"./assets/avatars/ava1.png"));
// }

// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Chatter } from './chatter';



@Injectable({ providedIn: 'root' })
export class ChatterService {
  changeAva(event: any): any {
    this.http.post<any>(`${environment.config.apiUrl}/chatters/currentavatar`,[event]).subscribe();
  }

  getAllAvas(): Observable<any> {
    return this.http.get<string[]>(`${environment.config.apiUrl}/chatters/current/avatars`);
  }
    constructor(private http: HttpClient) { }

    getAll() :Observable<Chatter[]>  {
        return this.http.get<Chatter[]>(`${environment.config.apiUrl}/chatters`);
    }

    getById(id: number): Observable<Chatter>  {
        return this.http.get<Chatter>(`${environment.config.apiUrl}/chatters/${id}`);
    }

    uploadAvatar(uploadData){
        console.log('pppp')
        console.log(uploadData)
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
      //  this.http.post('api/upload', uploadData, {headers: headers})
        this.http.post<any>(`${environment.config.apiUrl}/chatters/current/avatars`,uploadData,{headers: headers}).subscribe();
    }

    
    public getMe(): Observable<Chatter> {
      // this.a$=this.http.get<Chatter>(`${environment.config.apiUrl}/chatters/current`);
      // console.log("sss")
      // console.log(this.a$)
      // return this.a$;
      return this.http.get<Chatter>(`${environment.config.apiUrl}/chatters/current`);
}

    // register(user: Chatter) {
    //     return this.http.post(`${environment.config.apiUrl}/chatters/register`, user);
    // }

    // update(user: Chatter) {
    //     return this.http.put(`${environment.config.apiUrl}/chatters/${user.pid}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${environment.config.apiUrl}/chatters/${id}`);
    // }
}
