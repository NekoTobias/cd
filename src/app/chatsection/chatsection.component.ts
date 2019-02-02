import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoomService } from '../room.service';
import { Observable, of } from 'rxjs';
import { Room } from '../room';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chatsection',
  templateUrl: './chatsection.component.html',
  styleUrls: ['./chatsection.component.css']
})
export class ChatsectionComponent implements OnInit {

  @Input()
  private messageTmp
  @Input()
  private rooms$ : Observable<Room[]>;
  @Input()
  private room$ : Observable<Room>;
  private test :string;

  @Input()
  private room2 : Room;


  @Output()
  private sendMessageEmitter = new EventEmitter<string>();

  @Output()
  private sendMessage(message):void{
      // console.log(this.room$.verlauf.push('blub'));
      
      // console.log('s')
      // console.log(this.room$)
      this.sendMessageEmitter.emit(message);
  }

  constructor(/*private readonly roomService: RoomService*/) {

    //this.test=this.roomService.getTest();
    //this.test="hhh";
    //this.rooms$=this.roomService.getAll();
    //console.log(this.rooms$);
    //this.room$ =this.roomService.get(2);
  }

  ngOnInit() {
  }

}
