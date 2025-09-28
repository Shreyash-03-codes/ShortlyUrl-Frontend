import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { GetAllUrlComponent } from './pages/get-all-url/get-all-url.component';
import { GetLongUrlComponent } from './pages/get-long-url/get-long-url.component';
import { GetShortUrlComponent } from './pages/get-short-url/get-short-url.component';
import { DeleteUrlComponent } from './pages/delete-url/delete-url.component';

export const routes: Routes = [
    {
        path:'',
        component:WelcomeComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'signup',
        component:SignUpComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
   {
        path:'short-url',
        component:GetShortUrlComponent
    },
    {
        path:'all-urls',
        component:GetAllUrlComponent
    },
    {
        path:'long-url',
        component:GetLongUrlComponent
    },
    {
        path:'delete-url',
        component:DeleteUrlComponent
    },
    {
        path:'**',
        component:WelcomeComponent
    }
];
