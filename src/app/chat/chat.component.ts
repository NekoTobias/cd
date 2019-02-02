import { Component, OnInit, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable, of } from 'rxjs';
import { Room } from '../room';
import { Chatter } from '../chatter';
import { ChatterService } from '../chatter.service';
import { SocketService } from '../socket.service';
import { Message } from '../message';
import  {Event } from '../event';
import { map, tap } from 'rxjs/operators';
import { CustomPixiService } from '../custom-pixi.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
  
})
export class ChatComponent implements OnInit {

  private chatters$ : Observable<Chatter[]>;
  private ownchatter$ : Observable<Chatter>;
 
  private rooms$ : Observable<Room[]>;
  private room$ : Observable<Room>;
  private test :string;

  @Output()
  private changeRoom(changedRoom :Room) : void{

    //console.log("changedroom")
    //console.log(changedRoom)
    // this.ownchatter$.subscribe(data=>{
    //   this.room$.subscribe(u=>this.socketService.leaveRoom(data,u.pid));
    // })
    this.ownchatter$.subscribe(ownchatter=>{
      this.room$.subscribe(room=>{
        //this.socketService.leaveRoom(ownchatter,room)
        this.socketService.changeRoom(ownchatter,room.pid,changedRoom.pid);
        //this.room$=of(changedRoom);
        //this.socketService.joinRoom(ownchatter,changedRoom)
      })
    })
    // this.ownchatter$.pipe(tap(data=>{
    //   console.log('JAAAAA')
    //   this.room$.pipe(tap(u=>this.socketService.leaveRoom(data,u.pid))).subscribe();
    // })).subscribe()
    // this.room$=of(changedRoom);
    // this.ownchatter$.subscribe(data=>{
    //   this.socketService.joinRoom(data,changedRoom.pid);
    // })
    

  }

  @Output()
  private sendMessage(message):void{
    //console.log('mess:'+message)
    this.room$.subscribe(data=>this.roomService.pushMessage(data, message));
    this.sendMessage2(message.message);
    
  }

  private readonly roomService:RoomService;

  constructor(roomService: RoomService, private readonly chatterService: ChatterService, private socketService: SocketService/*,private cdr: ChangeDetectorRef*/,private pixiservice : CustomPixiService) {

   
    this.roomService=roomService;
    this.pixiservice.setSocketService(this.socketService)
    this.test=this.roomService.getTest();
    //this.test="hhh";
    this.rooms$=this.roomService.getAll();
    //console.log('s')
    //console.log(this.rooms$);
    this.room$ =this.roomService.getById(0);
    //console.log(this.room$)
    this.chatters$=this.chatterService.getAll();
    this.ownchatter$=this.chatterService.getMe();



    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messagesTmp.push(message);
        //console.log("new message")
        //console.log(message);
        //console.log('ffff')
        // console.log('room')
        // console.log(this.room$)
        // this.room$.subscribe();
        // this.room$.pipe(map(data=>{console.log(data.verlauf);data.verlauf.push(message.content);data.name='ahhahaah'; cdr.markForCheck();this.room$=of(data); cdr.detectChanges(); return data}))
        // cdr.markForCheck
        

      });

      function removeDups(names) {
        let unique = {};
        names.forEach(function(i) {
          if(!unique[i]) {
            unique[i] = true;
          }
        });
        return Object.keys(unique);
      }

      this.socketService.onInitChat()
      .subscribe((obj: any) => {
        console.log('LLLLLLLL')
          // console.log(obj[0]);
          // console.log(Array.from(obj))
          // let roommaps = obj;
          // //let a= roommaps.values();
          // //console.log(a);
          // //console.log(Array.from(a.entries()))
          // //console.log(usobj)
          
            
          //   this.rooms$.subscribe(rooms=>{
          //     // this.room$.subscribe(room=>{
          //       let roomsnew : Room[]=rooms;
          //       let j=0;
          //       roommaps.forEach(roommap => {
          //         console.log(roommap);
                  
          //         for(let i=0; i<roommap.length;i++){
          //           console.log(rooms)
          //           if(roomsnew[j].users.filter(el=>JSON.stringify(el) === JSON.stringify(roommap[i])).length>0){
          //             continue;
          //           }
          //           console.log('kskssssaksk')
          //           roomsnew[j].users.push(roommap[i]);
          //         }
          //         // let x = (names) => names.filter((v,i) => names.indexOf(v) === i);
          //         // roomsnew[j].users=x(roomsnew[j].users);
          //        j++;
                  
                
              
          //        //roomsnew[roomnumber_old].users=roomsnew[roomnumber_old].users.filter(el => JSON.stringify(el) !== JSON.stringify(chatter));
                 
                 
                 
          //     // })
          //    })
          //    this.rooms$=of(roomsnew);
          //    });
          //   //console.log(roommap.values()[0]);
          //   // roommap.forEach(users => {
          //   //   console.log(users)
          //   //   console.log('fddddduf')
              
          //   // });
          //   this.room$.subscribe(room=>room.users.forEach(e => {
          //     this.ownchatter$.subscribe(own=>{
          //       if(JSON.stringify(own)!==JSON.stringify(e)){
          //         this.pixiservice.drawUser(e)
          //       }
              
          //     })
             
          //   }))
        
      });


      this.socketService.onLeaveChat()
      .subscribe((roomold_chatter: any) => {
        console.log('JJJJJJJJJJJJJJ')
        // let chatter = roomold_chatter[1];
        // let roomnumber = roomold_chatter[0];
        // let newrooms :Room[]
        // //let newroom : Room
        // this.rooms$.subscribe(rooms=>{
        //   this.room$.subscribe(sroom=>{
        //     console.log('------')
        //     console.log(rooms);
        //     console.log('------')
        //     newrooms=rooms;
        //     console.log('------')
        //     console.log(newrooms);
        //     console.log(roomnumber)
        //     console.log('------')
        //     newrooms[roomnumber].users= newrooms[roomnumber].users.filter(el=>JSON.stringify(el)!==JSON.stringify(chatter));

        //     this.rooms$=of(newrooms);
        //     if(sroom.pid===roomnumber){
        //       this.room$=of(newrooms[roomnumber]);
        //     }
            
        //   })
           
        // });

      });

      this.socketService.onChangeRoom()
      .subscribe((chatter_room: any) => {
        let chatter=chatter_room[0];
        let newroom=chatter_room[1];

        this.room$.subscribe(room=>{
            this.ownchatter$.subscribe(ownchatter=>{
              
               
                if(JSON.stringify(chatter)===JSON.stringify(ownchatter)){
                  room.users.forEach(user => {
                    this.pixiservice.undrawUser(user);
                  });
                  this.room$=of(newroom);
                  console.log('ARTE')
                  console.log(newroom);
                  this.pixiservice.removeAll();
                  this.pixiservice.changeBackground(newroom);
                  newroom.users.forEach(user => {
                    this.pixiservice.drawUser(user);
                  });
                 
                }
                else{
                  //this.pixiservice.undrawUser(chatter)
                  if(room.pid!==newroom.pid){
                    room.users=room.users.filter(el=>JSON.stringify(el)!==JSON.stringify(chatter));
                    this.room$=of(room);
                    console.log('URTE')
                    console.log(room);
                    this.pixiservice.undrawUser(chatter)
                 }
                 else{
                   console.log('kadgkdaka')
                   if(room.users.filter(el=>JSON.stringify(el)===JSON.stringify(chatter)).length===0){
                    room.users.push(chatter);
                    this.room$=of(room);
                    this.pixiservice.drawUser(chatter)
                   }
                  
                 }
                  // if(room.pid===newroom.pid){
                  //   room.users.push(chatter);
                  //   this.room$=of(room);
                  // console.log('ART22d2E')
                  // console.log(room);
                  // }
                  
                }
                
            })
        });
        // console.log('CHANGE!!!!!')
        // let chatter=chatter_roomold_roomnew[0]
        // let roomnumber_old=chatter_roomold_roomnew[1];
        // let roomnumber_new=chatter_roomold_roomnew[2];
        // let newroom;
        // this.rooms$.subscribe(rooms=>{
        //   console.log('22r22')
        //     console.log(rooms)
        // })
        // this.rooms$.subscribe(rooms=>{
        //  // this.room$.subscribe(room=>{
        //    let roomsnew : Room[]=rooms;
        //    let user2draw=[];
        //    let user2undraw=[];
        //   console.log('dededghede')
        //   console.log(roomsnew)
        //   console.log('========')
        //   console.log( roomsnew[roomnumber_old].users)
        //   roomsnew[roomnumber_old].users.filter(el => JSON.stringify(el) === JSON.stringify(chatter)).forEach(ch=>user2undraw.push(ch))
        //   roomsnew[roomnumber_old].users.forEach(olduser=>{
        //     if(roomnumber_new!==roomnumber_old){
        //       user2undraw.forEach(undrawuser=>{
        //         if(JSON.stringify(olduser)===JSON.stringify(undrawuser)){
        //           this.pixiservice.undrawUser(olduser)
        //         }
        //       })
        //     }
           
            
        //   }) 
        //     roomsnew[roomnumber_old].users=roomsnew[roomnumber_old].users.filter(el => JSON.stringify(el) !== JSON.stringify(chatter));
        //     roomsnew[roomnumber_old].users.filter(el => JSON.stringify(el) === JSON.stringify(chatter));
        //     console.log( roomsnew[roomnumber_old].users)
        //     console.log('========')
        //     if(roomsnew[roomnumber_new].users.filter(el=>JSON.stringify(el) === JSON.stringify(chatter)).length===0){
        //       console.log('chatter not there')
        //       console.log(roomsnew[roomnumber_new].users)
        //       console.log(chatter)
        //       roomsnew[roomnumber_new].users.push(chatter);
              
        //       user2draw.push(chatter)
        //     }
           
        //     console.log(chatter)
        //     console.log('kakggaddk')
        //     console.log(roomsnew);
            
        //     this.rooms$=of(roomsnew)
        //     //this.room$=of(roomsnew[roomnumber_new]);
        //     this.ownchatter$.subscribe(own=>{
        //       if(chatter.id===own.id){
                
        //         this.room$=of(roomsnew[roomnumber_new]);
        //         this.pixiservice.changeBackground(this.room$)
        //         roomsnew[roomnumber_new].users.forEach(ch=>this.pixiservice.drawUser(ch));
        //       }
        //       else{
        //         for(let ch of user2undraw){
        //           if(JSON.stringify(ch)===JSON.stringify(chatter) && roomnumber_new===roomnumber_old && user2draw.filter(e=>JSON.stringify(e)===JSON.stringify(chatter)).length==0){
        //             continue;
        //           }
        //           if(chatter.id!==own.id){
        //             this.pixiservice.drawUser(chatter)
        //           }
        //         }
                
        //       }
              
        //     })
            
        //  // })
        // })
        // this.rooms$.subscribe(rooms=>{
        //   console.log('11111')
        //     console.log(rooms)
        // })
        

      });

      this.socketService.onLeaveRoom()
      .subscribe((chatter: any) => {
        console.log('lalddhfllal')
        this.room$.subscribe(room=>{
            if(room.users.filter(el=>JSON.stringify(el)===JSON.stringify(chatter)).length>0){
              this.pixiservice.undrawUser(chatter);
              room.users=room.users.filter(el=>JSON.stringify(el)!==JSON.stringify(chatter));
              this.room$=of(room)
            }
        });

      });

      // this.socketService.onLeaveRoom()
      // .subscribe((chatter_room: any) => {
      //   //this.rooms$.subscribe(rooms=>{
      //    // this.room$.subscribe(room=>{
      //       let chatter=chatter_room[0]
      //       let room2=chatter_room[1];
      //       console.log('lllleave')
      //       //console.log('Leave raum derzetig '+room.pid)
      //     //console.log('Leave raum data '+roomnumber)
      //    //if(room.pid===roomnumber){
      //       if(room2.users.some(e => JSON.stringify(e)===JSON.stringify(chatter))){
      //       console.log('iiiiiiii')
      //       console.log(room2.users)
      //       console.log(chatter)
      //       pixiservice.undrawUser(chatter);
      //       room2.users=room2.users.filter(el => JSON.stringify(el) !== JSON.stringify(chatter));
      //       //room.users.pop()
      //       console.log(room2.users)
      //       console.log('iiiiiiii2')
            

      //       //console.log('üüüüüüüKK')
      //         //console.log(rooms)
      //         //rooms[room.pid].users=room.users;
      //       //  console.log('üüüüüüü2KK')
      //       //room.users.re(chatter)
      //       //pixiservice.undrawUsers(room.users);
      //       // this.rooms$.pipe(map(e=>{
      //       //   console.log('üüüüüüüKK')
      //       //   console.log(e)
      //       //   e[room.pid].users=room.users;
      //       //   console.log('üüüüüüü2KK')
              
      //       // })).subscribe();
      //       // this.rooms$.subscribe(e=>{
      //       //   console.log('üüüüüüü')
      //       //   console.log(e)
      //       //   e[room.pid].users=room.users;
      //       //   console.log('üüüüüüü2')
              
      //       // });
      //       }// }  }
      //     console.log('bebebebeb')
      //   console.log(room2)
      //   this.ownchatter$.subscribe(ownchatter=>{
      //     if(JSON.stringify(ownchatter)===JSON.stringify(chatter)){
      //       this.room$=of(room2);
           
      //     }
      //     this.rooms$.subscribe(rooms=>{
      //       rooms[room2.pid]=room2;
      //     })
      //   })
      //    // })
      //   //  console.log('tttt')
      //     //console.log(rooms)
          
      //     //e[roomnumber].users=room.users;
      //    // console.log(rooms)
      //    // console.log('tttt2')
      //  // });
      //   // let chatter=chatter_room[0]
      //   // let roomnumber=chatter_room[1];

      //   // console.log('llllleave')
      //   // this.room$.subscribe(room=>{
      //   //   console.log('Leave raum derzetig '+room.pid)
      //   //   console.log('Leave raum data '+roomnumber)
      //   //  if(room.pid!==roomnumber){
      //   //     if(room.users.some(e => JSON.stringify(e)===JSON.stringify(chatter))){
      //   //     console.log('iiiiiiii')
      //   //     console.log(room.users)
      //   //     console.log(chatter)
      //   //     pixiservice.undrawUser(chatter);
      //   //     room.users=room.users.filter(el => JSON.stringify(el) !== JSON.stringify(chatter));
      //   //     //room.users.pop()
      //   //     console.log(room.users)
      //   //     console.log('iiiiiiii2')
            

      //   //     //room.users.re(chatter)
      //   //     //pixiservice.undrawUsers(room.users);
      //   //     this.rooms$.pipe(map(e=>{
      //   //       console.log('üüüüüüüKK')
      //   //       console.log(e)
      //   //       e[room.pid].users=room.users;
      //   //       console.log('üüüüüüü2KK')
              
      //   //     })).subscribe();
      //   //     this.rooms$.subscribe(e=>{
      //   //       console.log('üüüüüüü')
      //   //       console.log(e)
      //   //       e[room.pid].users=room.users;
      //   //       console.log('üüüüüüü2')
              
      //   //     });
      //   //   }  }
      //   //   console.log('bebebebeb')
      //   // console.log(room)
      //   // // this.rooms$.subscribe(e=>{
      //   // //   console.log('üüüüüüü')
      //   // //   console.log(e)
      //   // //   e[roomnumber].users=room.users;
      //   // //   console.log('üüüüüü2')
          
      //   // // });
      //   // })
      //   // //console.log('bebebebeb')
      //   // //console.log(this.rooms$)
      //   // this.rooms$.subscribe(e=>{
      //   //   console.log('tttt')
      //   //   console.log(e)
          
      //   //   //e[roomnumber].users=room.users;
      //   //   console.log(e)
      //   //   console.log('tttt2')
      //   // });
      // });

      // this.socketService.onJoinRoom()
      // .subscribe((chatter_room: any) => {
      //   //this.rooms$.subscribe(rooms=>{
      //     //this.room$.subscribe(room=>{
      //       let chatter=chatter_room[0]
      //       let room2=chatter_room[1];

      //     //  console.log('ääääääU')
      //     //console.log(rooms)
          
      //     //e[roomnumber].users=room.users;
      //     ////console.log(rooms)
      //     //console.log('äääää2')
      //     //if(room.pid===roomnumber){
      //       if(room2.users.some(e => JSON.stringify(e)===JSON.stringify(chatter))){
      //         console.log('sw')
      //         return;
      //       }
      //       console.log('eeeeeee')
      //       console.log(room2.users)
      //       room2.users.push(chatter)
      //       pixiservice.drawUser(chatter);
            
      //       console.log(room2.users)
      //       console.log('eeeeee2')
      //       // this.rooms$.subscribe(e=>{
      //       //   console.log('öööööööööö')
      //       //   console.log(e)
              
      //       //   e[roomnumber].users=room.users;
      //       //   console.log(e)
      //       //   console.log('öööööööööö2')
      //       // });
      //    //}
      //   //  console.log('öööööööööö')
      //   //  console.log(rooms)
         
      //   //  rooms[roomnumber].users=room.users;
      //   //  console.log(rooms)
      //   //  console.log('ööööööööö2')
      //    // })
      //   //})
      //   //console.log('llllll')
      //   // let chatter=chatter_room[0]
      //   // let roomnumber=chatter_room[1];

      //   // this.rooms$.subscribe(e=>{
      //   //   console.log('ääääääU')
      //   //   console.log(e)
          
      //   //   //e[roomnumber].users=room.users;
      //   //   console.log(e)
      //   //   console.log('äääää2')
      //   // });
      //   // // this.rooms$.subscribe(data=>{
      //   // //   //data[roomnumber].users.push(chatter);
      //   // //   console.log('add user')
      //   // //   console.log(data)
      //   // //   this.room$.subscribe(my=>{
      //   // //     console.log(my)
      //   // //     if(my.pid==roomnumber){
      //   // //       console.log(my.users);
      //   // //       console.log(chatter)
      //   // //       if (my.users.some(e => JSON.stringify(e)===JSON.stringify(chatter))) {
      //   // //         /* vendors contains the element we're looking for */
      //   // //           console.log('chatter already in room')
      //   // //           return
      //   // //       }
      //   // //       my.users.push(chatter)
      //   // //       console.log(my.users);
              
      //   // //       pixiservice.drawUser(chatter);
      //   // //       this.tmpchatterStore.push(chatter);
      //   // //       let tmp=[];
      //   // //       tmp= my.users.filter(item => this.tmpchatterStore.indexOf(item) < 0);
      //   // //       tmp.forEach(e=>pixiservice.drawUser(e));
             
      //   // //     }
            
      //   // //   })
      //   // //})
      //   // this.room$.subscribe(room=>{
      //   //   this.rooms$.subscribe(e=>{
      //   //     console.log('ääääää')
      //   //     console.log(e)
            
      //   //     //e[roomnumber].users=room.users;
      //   //     console.log(e)
      //   //     console.log('äääää2')
      //   //   });
      //   //  if(room.pid===roomnumber){
      //   //     if(room.users.some(e => JSON.stringify(e)===JSON.stringify(chatter))){
      //   //       console.log('sw')
      //   //       return;
      //   //     }
      //   //     console.log('eeeeee')
      //   //     console.log(room.users)
      //   //     room.users.push(chatter)
      //   //     pixiservice.drawUser(chatter);
            
      //   //     console.log(room.users)
      //   //     console.log('eeeeee2')
      //   //     // this.rooms$.subscribe(e=>{
      //   //     //   console.log('öööööööööö')
      //   //     //   console.log(e)
              
      //   //     //   e[roomnumber].users=room.users;
      //   //     //   console.log(e)
      //   //     //   console.log('öööööööööö2')
      //   //     // });
      //   //  }
      //   //  this.rooms$.subscribe(e=>{
      //   //   console.log('öööööööööö')
      //   //   console.log(e)
          
      //   //   e[roomnumber].users=room.users;
      //   //   console.log(e)
      //   //   console.log('öööööööööö2')
      //   // });
      //   //   //console.log('allalalrl')
      //   //   //console.log(room)
          
      //   // })
      //   // //console.log('alalala')
      //   // //console.log(this.rooms$)
      
      //   this.ownchatter$.subscribe(ownchatter=>{
      //     if(JSON.stringify(ownchatter)===JSON.stringify(chatter)){
      //       this.room$=of(room2);
            
      //     }
      //     this.rooms$.subscribe(rooms=>{
      //       rooms[room2.pid]=room2;
      //     })
      //   })
      // });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
        
        this.ownchatter$.subscribe(ownchatter=>{
          this.socketService.initChat(ownchatter);
          this.socketService.changeRoom(ownchatter,0,0)
        })
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
        this.ownchatter$.subscribe(ownchatter=>{
          this.room$.subscribe(room=>{
            console.log('JJJJJJJJJJJJJJ')
            this.socketService.leaveChat(ownchatter,room.pid);
          })
          
          
        })
      });

  }

  private tmp$ : Observable<Room>
  private tmpchatterStore=[];
  messagesTmp: Message[] = [];
  
  ioConnection: any;

 

 

  public sendMessage2(message: string): void {
    //console.log('d')
    if (!message) {
      return;
    }
    //console.log('g')
    this.ownchatter$.subscribe(data=>{
      console.log('334')
      let mymessage= new Message(message,data);
      this.socketService.send(mymessage);
    
    });
    
    
  }

  // public sendNotification(params: any, action: Action): void {
  //   let message: Message;

  //   if (action === Action.JOINED) {
  //     message = {
  //       from: this.user,
  //       action: action
  //     }
  //   } else if (action === Action.RENAME) {
  //     message = {
  //       action: action,
  //       content: {
  //         username: this.user.name,
  //         previousUsername: params.previousUsername
  //       }
  //     };
  //   }

  //   this.socketService.send(message);
  // }
 
  public LogOut(){
    this.room$.subscribe(data=>{
      console.log('Ausgabe:')
      console.log(data)
    })
  }

  ngOnInit() {
   
  }

}
