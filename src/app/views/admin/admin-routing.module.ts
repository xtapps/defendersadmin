import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from '../components/location/location.component';
import { WebsitesComponent } from '../components/websites/websites.component';
import { AppsListComponent } from '../components/apps-list/apps-list.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { DefendersListComponent } from '../components/defenders-list/defenders-list.component';
import { AddNewComponent } from '../components/add-new/add-new.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'location', component: LocationComponent
  },
  {
    path: 'websites', component: WebsitesComponent
  },
  {
    path: 'apps', component: AppsListComponent
  },
  {
    path: 'categories', component: CategoriesComponent
  },
  {
    path: 'group-codes', component: LocationComponent
  },
  {
    path: 'defenders', component: DefendersListComponent
  },
  {
    path: 'add-new', component: AddNewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
