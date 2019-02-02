import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { AboutComponent } from './about/about.component';
import { NewsComponent } from './news/news.component';
import { MainstartComponent } from './mainstart/mainstart.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { ProfileComponent } from './profile/profile.component';



const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path:'chat',component: ChatComponent},
      {path:'about',component: AboutComponent},
     {path:'news', component: NewsComponent},
    {path:'start', component: MainstartComponent},
     {path:'market', component: MarketplaceComponent},
     {path:'chatters/current', component: ProfileComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);