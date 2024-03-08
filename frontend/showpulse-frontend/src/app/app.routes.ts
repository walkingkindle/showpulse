import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { RecommenditComponent } from './pages/recommendit/recommendit.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'search', component:SearchComponent},
    {path:'recommendit',component:LoadingBarComponent},
    
];
