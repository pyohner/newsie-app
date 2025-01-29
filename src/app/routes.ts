import { Routes } from '@angular/router';
import { NewsstandComponent} from "./newsstand/newsstand.component";
import { DetailsComponent } from './details/details.component';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {FeaturedComponent} from "./featured/featured.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";


const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Newsie'
  },
  {
    path: 'newsstand',
    component: NewsstandComponent,
    title: 'The Newsstand'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Newsie'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Newsletter details'
  },
  {
    path: 'featured',
    component: FeaturedComponent,
    title: 'Featured newsletters'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    title: 'Forgot Password'
  }


];

export default routeConfig;
