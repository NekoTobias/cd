import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatter } from '../chatter';
import { Room } from '../room';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  @Input()
  private chatters$ : Observable<Chatter[]>
  @Input()
  private room$ : Observable<Room>

  constructor() { }

  ngOnInit() {
  }

}
