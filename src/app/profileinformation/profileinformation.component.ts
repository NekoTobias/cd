import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatter } from '../chatter';

@Component({
  selector: 'app-profileinformation',
  templateUrl: './profileinformation.component.html',
  styleUrls: ['./profileinformation.component.css']
})
export class ProfileinformationComponent implements OnInit {

  @Input()
  private ownchatter$ : Observable<Chatter>

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.ownchatter$)
  }

}
