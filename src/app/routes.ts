import { Routes } from '@angular/router';
import { NewsstandComponent} from "./newsstand/newsstand.component";
import { DetailsComponent } from './details/details.component';

const routeConfig: Routes = [
  {
    path: '',
    component: NewsstandComponent,
    title: 'The Newsstand'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Newsletter details'
  }
];

export default routeConfig;
