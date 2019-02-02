import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from './room';
import { Chatter } from './chatter';
import { map } from 'rxjs/operators';
import { log } from 'util';
import { SocketService } from './socket.service';


declare var PIXI: any; // instead of importing pixi like some tutorials say to do use declare


@Injectable({
  providedIn: 'root'
})
export class CustomPixiService {

  public pApp: any; // this will be our pixi application

  public socketService:SocketService;

  constructor() { }

  public init(pixiContainer : ElementRef){
    this.pApp = new PIXI.Application({ width: 800, height: 600,  transparent: true }); // this creates our pixi application
    pixiContainer.nativeElement.appendChild(this.pApp.view); // this places our pixi application onto the viewable document

  }

  public setSocketService(socketService){
    this.socketService=socketService;
  }

  public changeBackground(room : Room){
   // room$.subscribe(data=>{
      //console.log(changes.prop)
      //for (var i = this.pApp.stage.children.length - 1; i >= 0; i--) {	this.pApp.stage.removeChild(this.pApp.stage.children[i]);};
      console.log('midep')
      if(!!!room.backgroundeffect){
        var background = PIXI.Sprite.fromImage("http://localhost:4000/"+room.background);
        background.width = this.pApp.screen.width;
        background.height = this.pApp.screen.height;
        this.pApp.stage.addChild(background);
      }
      else if(room.backgroundeffect==='tiling'){
// create a texture from an image path
let texture = PIXI.Texture.fromImage("http://localhost:4000/"+room.background);

/* create a tiling sprite ...
 * requires a texture, a width and a height
 * in WebGL the image size should preferably be a power of two
 * d
 */

let tilingSprite = new PIXI.extras.TilingSprite(
  texture,
  this.pApp.screen.width,
  this.pApp.screen.height
);
this.pApp.stage.addChild(tilingSprite);
let count = 0;

this.pApp.ticker.add(function() {

    count += 0.005;

    tilingSprite.tileScale.x = 2 + Math.sin(count);
    tilingSprite.tileScale.y = 2 + Math.cos(count);

    tilingSprite.tilePosition.x += 1;
    tilingSprite.tilePosition.y += 1;
});
      }
    else if(room.backgroundeffect==='drawing'){
     
    let dragging = false;
    this.pApp.stage.interactive = true;

    let artboard = PIXI.Sprite.fromImage(room.background);
artboard.x = this.pApp.screen.width / 2;
artboard.y = this.pApp.screen.width / 2;
artboard.width = this.pApp.screen.width;
artboard.height = this.pApp.screen.width;
artboard.anchor.set(0.5);

artboard.buttonMode = true;
artboard.interactive = true;

this.pApp.stage.addChild(artboard);

// draw a circle
var graphics = new PIXI.Graphics();
this.pApp.stage.addChild(graphics);

// function onDragStart(event) {
//     dragging = true;
// }

// function onDragEnd() {
//     dragging = false;
// }

// function onDragMove() {

// }

artboard
  .on('pointerdown', (event)=> {
    dragging = true;
    this.socketService.resetDrawCoordinates()
})
  .on('pointerup', ()=> {
    dragging = false;
    //oldx=null;
    //oldy=null;
})
  .on('pointerupoutside', ()=> {
    dragging = false;
    //oldx=null;
    //oldy=null;d
})
  .on('pointermove',()=> {
    
});


this.pApp.ticker.add(()=> {
 // console.log(dragging)
 
	  if(dragging)
      {
          
          let newPosition = this.pApp.renderer.plugins.interaction.mouse.global;
          // graphics.lineStyle(0);
          // graphics.beginFill(0xFFFF0B, 1);
          // graphics.drawCircle(newPosition.x, newPosition.y,1);
          // graphics.endFill();
          this.socketService.sendDrawCoordinates(newPosition.x, newPosition.y,1)
         
      }
});


let oldx;
let oldy;
this.socketService.onResetDrawCoordinates()
      .subscribe((ch: any) => {
        oldx=null;
        oldy=null;
      });
this.socketService.onSendDrawCoordinates()
      .subscribe((ch: any) => {

        if(!!!oldx || !!!oldy){
          oldx=ch[0];
          oldy=ch[1];
        }
        
graphics.lineStyle(4, 0x000000, 1); 
graphics.moveTo(oldx, oldy); 
graphics.quadraticCurveTo(oldx, oldy, ch[0], ch[1]);
oldx=ch[0];
oldy=ch[1];

        // graphics.lineStyle(0);
        // graphics.beginFill(0xFFFF0B, 1);
        // graphics.drawCircle(ch[0], ch[1],ch[2]);
        // graphics.endFill();
      });

    }
    










  //  })
  }

  // public undrawUsers(chatters : Chatter[]):void{
  //   for(let chatter of chatters){

  //   }
  //   for (var i = this.pApp.stage.children.length - 1; i >= 0; i--) {	this.pApp.stage.removeChild(this.pApp.stage.children[i]);};

  // }

  private map = new Map();
  private map2= new Map();

  public undrawUser(chatter : Chatter):void{
   
    this.pApp.stage.removeChild(map[chatter.id]);
    delete map[chatter.id];

    this.map2.delete(chatter.id);

  }

  // public drawUsers(chatters : Chatter[]):void{
  //   // room$.subscribe(data=>{
  //   // //this.removeChatters();
  //   // for(let i=0; i<data.users.length;i++){
  //   //   console.log('draw')
  //   //   console.log(data.users);
  //   //   let sprite = PIXI.Sprite.fromImage(data.users[i].avatars[0]);

  //   //   // Set the initial position
  //   //   sprite.anchor.set(0.5);
  //   //   sprite.x = this.pApp.screen.width / 2;
  //   //   sprite.y = this.pApp.screen.height / 2;
      
  //   //   // Opt-in to interactivity
  //   //   sprite.interactive = true;
      
  //   //   // Shows hand cursor
  //   //   sprite.buttonMode = true;
      
  //   //   // Pointers normalize touch and mouse
  //   //   //sprite.on('pointerdown', onClick);
      
  //   //   // Alternatively, use the mouse & touch events:
  //   //   sprite.on('click', function onClick(){sprite.x += 66;
  //   //     sprite.y += 11;}); // mouse-only
  //   //   // sprite.on('tap', onClick); // touch-only
      
  //   //   this.pApp.stage.addChild(sprite);
  //   // }});
  //     for(let chatter of chatters){

  //     console.log('draw')
     
  //     let sprite = PIXI.Sprite.fromImage(chatter.avatars[0]);

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
  //     }
  // }

  public drawUser(chatter : Chatter):void{
   
    //this.removeChatters();
    
      console.log('draw')
     
      let sprite = PIXI.Sprite.fromImage("http://localhost:4000/"+chatter.currentavatar);

      // Set the initial position
      sprite.anchor.set(0.5);
      sprite.x = this.pApp.screen.width / 2;
      sprite.y = this.pApp.screen.height / 2;
      
      // Opt-in to interactivity
      sprite.interactive = true;
      
      // Shows hand cursor
      sprite.buttonMode = true;
      
      // Pointers normalize touch and mouse
      //sprite.on('pointerdown', onClick);
      let xvelo=0.1;
      let yvelo=0.1;
      let mx//=200;
      let my//=50;
      sprite.visible=false;
      this.socketService.sendPosition(chatter,mx,my);
      this.socketService.onSendPosition()
      .subscribe((ch: any) => {
        if(ch[0].id===chatter.id){
        mx=ch[1][0];
        my=ch[1][1];
        sprite.x=mx;
        sprite.y=my;
        sprite.visible=true;
        }
      });
      let avawidth=150;
      let avaheight=150;
      //mx=Math.floor(Math.random() * ((this.pApp.screen.width-avawidth) - 0 + 1)) + 0;
      //my=Math.floor(Math.random() * ((this.pApp.screen.height-avaheight) - 0 + 1)) + 0;cc
      this.map2.set(chatter.id,sprite);

      const getMousePosition = () => this.pApp.renderer.plugins.interaction.mouse.global;
      let mousePosition=getMousePosition();
      this.socketService.initPlayerPos(chatter);
      this.socketService.onInitPlayerPos()
      .subscribe((ch: any) => {
        if(ch[0].id!==chatter.id){
    //if(sprite===this.map2.get(ch[0].id)){
      mx=ch[1];
      my=ch[2];
      sprite.x=mx;
      sprite.y=my;
      sprite.visible=true;
     }//}
      
    });
      let speed=4;
      let angle=45;
      // Alternatively, use the mouse & touch events:
      // sprite.on('click', function onClick(){
      //   mousePosition=getMousePosition();
        
      //   sprite.x = mousePosition.x;
      //   sprite.y =mousePosition.y;
      // }); // mouse-only
      // sprite.on('tap', onClick); // touch-onlye
      map[chatter.id]=
      this.pApp.stage.addChild(sprite);
      //this.pApp.stage.hitArea = new PIXI.Rectangle(0, 0, this.pApp.screen.width, this.pApp.screen.height);
      //let renderer = new PIXI.autoDetectRenderer();
     

      this.socketService.onMoveUser()
      .subscribe((chxy: any) => {
        let ownchatter=chxy[0];
        console.log('JrrrddddJJJhhddffdfJJJJJ')
        console.log(chxy)
        let x=chxy[1];
        let y=chxy[2];
        //sprite=this.map2.get(ownchatter.id);
        //if(ownchatter.id===chatter.id){
          // console.log('ÖÖfjfdÖÖe')
          // console.log(ownchatter)
          // console.log(chatter)
          // console.log('ÄÄÄÄedddÄn')
          // this.pApp.renderer.plugins.interaction.on('mousedown', ()=>{
          //   console.log("Mouse is down");
           
          
          //   mx = x;
          //   my =y;ghhghrddr
          // });
          //console.log(sprite);
          //console.log(this.map2.get(ownchatter.id))
          if(sprite===this.map2.get(ownchatter.id)){
            mx = x;
            my =y;
         // }
        
        }
           

      });
      
      this.pApp.renderer.plugins.interaction.on('mousedown', ()=>{
        console.log("Mouse is down");
        this.socketService.moveUser(chatter,mousePosition.x,mousePosition.y); 
      });
        
        

        let epsilon=1;
        this.pApp.ticker.add(()=>{
          //console.log(mx)
          if(!!mx&&!!my){
   //log(getMousePosition());d
         // mousePosition=getMousePosition();
         if(Math.abs(sprite.x-mx)>=epsilon && Math.abs(sprite.y-my)>=epsilon){
          let dx= mx-sprite.x;
          let dy =my-sprite.y;
          angle= Math.atan2(dy,dx);
          xvelo= Math.cos(angle)*speed;
          yvelo= Math.sin(angle)*speed;
          sprite.x+=xvelo;
          sprite.y+=yvelo;
          }
       
         }
         
        })
        // this.pApp.renderer.plugins.interaction.on('mousedown', ()=>{
        //     console.log("Mouse is down");
        //     this.socketService.moveUser(chatter); 
        //   });
    
     
      
      // this.pApp.stage.on('mousedown', function onClick(){
      //   //mousePosition=getMousePosition();
      //   mx = mousePosition.x;
      //   my =mousePosition.y;
      //   console.log('slssllsls')
      // }); // mouse-only
      // let epsilon=1;
      // this.pApp.ticker.add(()=>{
        
      //   //log(getMousePosition());
      //  // mousePosition=getMousePosition();
      //  if(Math.abs(sprite.x-mx)>=epsilon && Math.abs(sprite.y-my)>=epsilon){
      //   let dx= mx-sprite.x;
      //   let dy =my-sprite.y;
      //   angle= Math.atan2(dy,dx);
      //   xvelo= Math.cos(angle)*speed;
      //   yvelo= Math.sin(angle)*speed;
      //   sprite.x+=xvelo;
      //   sprite.y+=yvelo;
      //  }
       
      //})
 
  }

  // private removeChatters(){
  //   for (var i = this.pApp.stage.children.length - 1; i >= 1; i--) {	this.pApp.stage.removeChild(this.pApp.stage.children[i]);};
  // }
  public getOnUpdateVideoUrl(){
    return  this.socketService.onUpdateVideoUrl();
  }

  public updateVideoUrl(videourl:string){
    this.socketService.updateVideoUrl(videourl);
    
  }

  public removeAll(){
    for (var i = this.pApp.stage.children.length - 1; i >= 0; i--) {	this.pApp.stage.removeChild(this.pApp.stage.children[i]);};
  }
}
