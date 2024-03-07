import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { LocationsComponent } from './locations/locations.component';
import { MobileAppsComponent } from './mobileapps/mobileapps.component';
import { OnlineComponent } from './online/online.component';
import { ButtonModule, CardModule, GridModule, TableModule } from '@coreui/angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'locations', pathMatch: 'full',
  },
  {
    path: 'locations', component: LocationsComponent
  },
  {
    path: 'mobileapps', component: MobileAppsComponent
  },
  {
    path: 'online', component: OnlineComponent
  },
]

@NgModule({
  declarations: [
    LocationsComponent,
    MobileAppsComponent,
    OnlineComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule,
    AdminRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    GridModule,
    TableModule,
    SharedAdminModule,
    ButtonModule
  ]
})
export class HealthModule { }
