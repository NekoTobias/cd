import { Component, OnInit, Input } from '@angular/core';
import { ChatterService } from '../chatter.service';
import { Observable } from 'rxjs';
import { Chatter } from '../chatter';
import { Room } from '../room';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  @Input()
  private chatters$ : Observable<Chatter[]>;
  @Input()
  private ownchatter$ : Observable<Chatter>;
  @Input()
  private room$ : Observable<Room>;
  // private chatters$ : Observable<Chatter[]>;
  // private ownchatter$ : Observable<Chatter>;

  // constructor(private readonly chatterService: ChatterService) {
  //     this.chatters$=this.chatterService.getAll();
  //     this.ownchatter$=this.chatterService.getMe();

  // }
  constructor(){}

  ngOnInit() {
  }

}
