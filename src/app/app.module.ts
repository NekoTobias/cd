import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ChathistoryComponent } from './chathistory/chathistory.component';
import { MenubarComponent } from './menubar/menubar.component';
import { ProfileinformationComponent } from './profileinformation/profileinformation.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { RightbarComponent } from './rightbar/rightbar.component';
import { CentersectionComponent } from './centersection/centersection.component';
import {RouterModule} from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { ChatsectionComponent } from './chatsection/chatsection.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MainstartComponent } from './mainstart/mainstart.component';
import { NotificationComponent } from './notification/notification.component';
import { PrivatemessageComponent } from './privatemessage/privatemessage.component';
import { ClubsComponent } from './clubs/clubs.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { SettingsComponent } from './settings/settings.component';

import { routing }        from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketService } from './socket.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatwindowComponent,
    UserlistComponent,
    ChathistoryComponent,
    MenubarComponent,
    ProfileinformationComponent,
    LeftbarComponent,
    RightbarComponent,
    CentersectionComponent,
    ChatComponent,
    ChatsectionComponent,
    AboutComponent,
    NewsComponent,
    MarketplaceComponent,
    MainstartComponent,
    NotificationComponent,
    PrivatemessageComponent,
    ClubsComponent,
    RoomlistComponent,
    SettingsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,

   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
  //   RouterModule.forRoot([
  //     {path:'chat',component: ChatComponent},
  //   {path:'about',component: AboutComponent},
  // {path:'news', component: NewsComponent},
  // {path:'start', component: MainstartComponent},
  // {path:'market', component: MarketplaceComponent}])
  ],
  providers: [ 
    SocketService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
