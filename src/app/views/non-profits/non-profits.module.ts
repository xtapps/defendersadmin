import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MilitaryComponent } from './military/military.component';
import { FirstResponderComponent } from './first-responder/first-responder.component';
import { ChaplainComponent } from './chaplain/chaplain.component';
import { OtherComponent } from './other/other.component';
import { CardModule, GridModule, TableModule } from '@coreui/angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomPaginationComponent } from '../../shared/custom-pagination/custom-pagination.component';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'military', pathMatch: 'full',
  },
  {
    path: 'military', component: MilitaryComponent
  },
  {
    path: 'first-responder', component: FirstResponderComponent
  },
  {
    path: 'chaplain', component: ChaplainComponent
  },
  {
    path: 'other', component: OtherComponent
  },
]

@NgModule({
  declarations: [
    MilitaryComponent,
    FirstResponderComponent,
    ChaplainComponent,
    OtherComponent  ],
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
    SharedAdminModule
  ]
})
export class NonProfitsModule { }
