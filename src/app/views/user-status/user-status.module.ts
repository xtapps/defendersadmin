import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { SubmitedListComponent } from './submited-list/submited-list.component';
import { SuspendedListComponent } from './suspended-list/suspended-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';
import { CardModule, GridModule, TableModule } from '@coreui/angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  { path: '', redirectTo: 'processing', pathMatch: 'full' },
  { path: 'processing', component: ProcessingListComponent },
  { path: 'submited', component: SubmitedListComponent },
  { path: 'approved', component: ApprovedListComponent },
  { path: 'rejected', component: RejectedListComponent },
  { path: 'suspended', component: SuspendedListComponent },
];

@NgModule({
  declarations: [
    ProcessingListComponent,
    ApprovedListComponent,
    RejectedListComponent,
    SubmitedListComponent,
    SuspendedListComponent
  ],
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
export class UserStatusModule { }