import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { Message } from '../message';

@Component({
  selector: 'app-chathistory',
  templateUrl: './chathistory.component.html',
  styleUrls: ['./chathistory.component.css']
  
})
export class ChathistoryComponent implements OnInit {

  @Input()
  private messageTmp : Message[]
  //private messages=[]
  //private rooms$ : Observable<Room[]>;
  @Input()
  private room$ : Observable<Room>;
  //private test :string;

  constructor() {
    
    //this.messages.push('h1');
    // this.test=this.roomService.getTest();
    // //this.test="hhh";
    // this.rooms$=this.roomService.getAll();
    // console.log(this.rooms$);
    // this.room$ =this.roomService.get(2);
  }

  private onTest(){
    //this.messages.push('h3')
    //console.log('4')
    this.messageTmp.push(new Message('h1'))
  }
  ngOnInit() {
  }

}
