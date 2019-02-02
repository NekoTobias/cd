import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';

@Component({
  selector: 'app-roomlist',
  templateUrl: './roomlist.component.html',
  styleUrls: ['./roomlist.component.css']
})
export class RoomlistComponent implements OnInit {

  @Input()
  private rooms$ : Observable<Room[]>

  @Input()
  private room$ : Observable<Room>
  
  @Output()
  private changeRoom(room):void{
    console.log(room)
    //this.room$=room;
    this.changedRoom.emit(room)

  }

  @Output() changedRoom = new EventEmitter<Room>();
  
  constructor() { }

  ngOnInit() {
  }



}
