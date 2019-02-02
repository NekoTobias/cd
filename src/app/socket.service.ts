import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { Message } from './message';
import { environment } from 'src/environments/environment';
import { Chatter } from './chatter';
import { Room } from './room';
const SERVER_URL = environment.config.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        console.log('arg')
        this.socket.emit('message', message);
    }

    public moveUser(chatter: Chatter, x : Number, y:Number): void {
        console.log('arg')
        this.socket.emit('move', [chatter,x,y]);
    }

    public onMoveUser(): Observable<any> {
        console.log('blarg4')
        return new Observable<any>(observer => {
            this.socket.on('move', (data: any) => observer.next(data));
        });
    }

    public initPlayerPos(chatter: Chatter): void {
        console.log('arg')
        this.socket.emit('position', chatter);
    }

    

    public sendPosition(chatter: Chatter, mx:Number, my:Number): void {
        console.log('arg')
        this.socket.emit('positioninit', [chatter,mx,my]);
    }

    public onSendPosition(): Observable<any> {
        console.log('blarg4')
        return new Observable<any>(observer => {
            this.socket.on('positioninit', (data: any) => observer.next(data));
        });
    }

    public onInitPlayerPos(): Observable<any> {
        console.log('blarg4')
        return new Observable<any>(observer => {
            this.socket.on('position', (data: any) => observer.next(data));
        });
    }

    public joinRoom(chatter: Chatter, room: Room): void {
        console.log('catte')
        this.socket.emit('joinroom', [chatter,room]);
    }

    public changeRoom(chatter: Chatter, room_old: Number, room_new : Number): void {
        console.log('ssss change')
        this.socket.emit('changeroom', [chatter,room_old,room_new]);
    }

    public initChat(chatter : Chatter): void {
        console.log('ssss change')
        this.socket.emit('initchat',chatter);
    }

    public leaveChat(chatter:Chatter,room_old: Number): void {
        console.log('ssss change')
        this.socket.emit('leavechat',[room_old,chatter]);
    }

    public onLeaveChat(): Observable<any> {
        console.log('blarg45')
        return new Observable<any>(observer => {
            this.socket.on('leavechat', (data: any) => observer.next(data));
        });
    }

    public leaveRoom(chatter: Chatter, room: Room): void {
        console.log('catte2')
        this.socket.emit('leaveroom', [chatter,room]);
    }

    public sendDrawCoordinates(x: Number, y: Number, z: Number): void {
      
        this.socket.emit('senddrawcoordinates', [x,y,z]);
    }

    public resetDrawCoordinates(): void {
      
        this.socket.emit('resetdrawcoordinates');
    }

    public onResetDrawCoordinates(): Observable<any> {
        //console.log('blarg2')
        return new Observable<any>(observer => {
            this.socket.on('resetdrawcoordinates', (data: any) => observer.next(data));
        });
    }

    public onSendDrawCoordinates(): Observable<any> {
        //console.log('blarg2')
        return new Observable<any>(observer => {
            this.socket.on('senddrawcoordinates', (data: any) => observer.next(data));
        });
    }

    public updateVideoUrl(videourl:string): void {
        //console.log('catte2')
        this.socket.emit('updatevideourl', videourl);
    }

    public onUpdateVideoUrl(): Observable<string> {
        //console.log('blarg2')
        return new Observable<any>(observer => {
            this.socket.on('updatevideourl', (data: any) => observer.next(data));
        });
    }

    public onJoinRoom(): Observable<Chatter> {
        console.log('blarg2')
        return new Observable<any>(observer => {
            this.socket.on('joinroom', (data: any) => observer.next(data));
        });
    }

    public onChangeRoom(): Observable<any> {
        console.log('blarg4')
        return new Observable<any>(observer => {
            this.socket.on('changeroom', (data: any) => observer.next(data));
        });
    }

    public onInitChat(): Observable<any> {
        console.log('blarg5')
        return new Observable<any>(observer => {
            this.socket.on('initchat', (data: any) => observer.next(data));
        });
    }

    public onLeaveRoom(): Observable<Chatter> {
        console.log('blarg3')
        return new Observable<any>(observer => {
            this.socket.on('leaveroom', (data: any) => observer.next(data));
        });
    }

    public onMessage(): Observable<Message> {
        console.log('blarg')
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: string): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
