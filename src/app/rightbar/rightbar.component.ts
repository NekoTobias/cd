import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {

  @Input()
  private messageTmp

  @Input()
  private room$ : Observable<Room>

  constructor() { }

  ngOnInit() {
  }

}
