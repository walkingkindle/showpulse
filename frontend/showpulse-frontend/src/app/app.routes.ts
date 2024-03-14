import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TechDocComponent } from './pages/tech-doc/tech-doc.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { Recommendations } from './components/recommendations/recommendations.component';
export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'search', component:SearchComponent},
    {path:'recommendit',component:Recommendations},
    {path:'tech-doc',component:TechDocComponent},
    {path: '404',component:NotFoundComponent},
    {path:'**',redirectTo:'/404'}
    
];
