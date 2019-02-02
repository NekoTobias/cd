import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-centersection',
  templateUrl: './centersection.component.html',
  styleUrls: ['./centersection.component.css']
})
export class CentersectionComponent implements OnInit {
  registerForm: FormGroup;
  @Input()
  private room$ :Observable<Room>

  @Input()
  private room2 :Room

  // @Input()
  // private sendmessage : string

  @Output()
  private sendMessage() :void {
    

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm.value)
      this.sendMessageEmitter.emit(this.registerForm.value);
      this.registerForm.reset();

  }

  @Output()
  private sendMessageEmitter=new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      message: ['', Validators.required]
  });
  }

}
