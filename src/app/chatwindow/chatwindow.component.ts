import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { CustomPixiService } from '../custom-pixi.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//import * as PIXI from 'pixi.js'
// declare var PIXI: any; // instead of importing pixi like some tutorials say to do use declare

@Component({
  selector: 'app-chatwindow',
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.css']
})
export class ChatwindowComponent implements OnInit {
  loginForm: FormGroup;
  
  // public pApp: any; // this will be our pixi application
  @ViewChild('pixiContainer') pixiContainer : ElementRef; // this allows us to reference and load stuff into the div container
  
  @Input()
  private room$ :Observable<Room>

  @Input()
  private room2 : Room
  
  private videoUrl;
  private dangerousVideoUrl;
  private vidid;
  

  private title: string
  constructor(private formBuilder: FormBuilder,private pixiservice : CustomPixiService,private sanitizer: DomSanitizer) { 
    this.title="Testtitel."

    //var app= this.pApp;
    // create a new Sprite from an image path
//var texture = PIXI.Texture.fromImage('assets/avatars/ava1.png')

    

   
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required]

  });
    // this.pApp = new PIXI.Application({ width: 800, height: 600 }); // this creates our pixi application
    // this.pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document
    this.pixiservice.init(this.pixiContainer)
    this.pixiservice.getOnUpdateVideoUrl().subscribe((newvidurl: any) => {
      console.log('videoooooo')
      this.updateVideoUrl(newvidurl)
    });;
    
    

    // this.room$.subscribe(data=>{
    //   var background = PIXI.Sprite.fromImage(data.background);
    //   background.width = this.pApp.screen.width;
    //   background.height = this.pApp.screen.height;
    //   this.pApp.stage.addChild(background);
    // })


  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    if (this.loginForm.invalid) {
      return;
  }
  this.pixiservice.updateVideoUrl(this.f.username.value);
  
  
  }

  // private drawUsers():void{
  //   this.room$.subscribe(data=>{
  //   for(let i=0; i<data.users.length;i++){
  //     console.log('draw')
  //     console.log(data.users);
  //     let sprite = PIXI.Sprite.fromImage(data.users[i].avatars[0]);

  //     // Set the initial position
  //     sprite.anchor.set(0.5);
  //     sprite.x = this.pApp.screen.width / 2;
  //     sprite.y = this.pApp.screen.height / 2;
      
  //     // Opt-in to interactivity
  //     sprite.interactive = true;
      
  //     // Shows hand cursor
  //     sprite.buttonMode = true;
      
  //     // Pointers normalize touch and mouse
  //     //sprite.on('pointerdown', onClick);
      
  //     // Alternatively, use the mouse & touch events:
  //     sprite.on('click', function onClick(){sprite.x += 66;
  //       sprite.y += 11;}); // mouse-only
  //     // sprite.on('tap', onClick); // touch-only
      
  //     this.pApp.stage.addChild(sprite);
  //   }});
  // }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id+ '?autoplay=1';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
    console.log(this.videoUrl)
  }

  public onPlay(event){
    console.log(event)
    this.updateVideoUrl(this.vidid);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // this.room$.subscribe(data=>{
    //   console.log(changes.prop)
    //   for (var i = this.pApp.stage.children.length - 1; i >= 0; i--) {	this.pApp.stage.removeChild(this.pApp.stage.children[i]);};
    //   console.log('miep')
    //   var background = PIXI.Sprite.fromImage(data.background);
    //   background.width = this.pApp.screen.width;
    //   background.height = this.pApp.screen.height;
    //   this.pApp.stage.addChild(background);


    // })
    //this.pixiservice.changeBackground(this.room2);
    //this.pixiservice.changeBackground(this.room$)
  }
 

}




