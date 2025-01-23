import { Routes } from '@angular/router';
import { NewsstandComponent} from "./newsstand/newsstand.component";
import { DetailsComponent } from './details/details.component';
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {FeaturedComponent} from "./featured/featured.component";

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
  }

];

export default routeConfig;
