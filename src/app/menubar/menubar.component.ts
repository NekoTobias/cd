import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';


@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  @Input()
  private rooms$ : Observable<Room[]>

  @Input()
  private room$ : Observable<Room>

  @Input()
  private mycomp: string;
  @Input()
  private overlay: string;
  @Input()
  private none:string;

  @Output()
  private toggle(event) : void {
    console.log(event);
    console.log(event.srcElement.className);
    this.mycomp=event.srcElement.className;
    console.log(this.mycomp)
    
    if(!!this.overlay){
      this.overlay="";
      this.none="none";
    }
    else{
      this.overlay="overlay";
      this.none="";
    }


  }

  @Output()
  private changeRoom(changedRoom){
    //this.room$=changedRoom;
    this.changedRoom.emit(changedRoom);
  }
  @Output()
  changedRoom = new EventEmitter<Room>();

  constructor() { }

  ngOnInit() {
    this.none="none";
    
  }



}
