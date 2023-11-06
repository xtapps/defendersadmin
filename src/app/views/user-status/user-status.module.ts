import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessingListComponent } from './processing-list/processing-list.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { RejectedListComponent } from './rejected-list/rejected-list.component';
import { SubmitedListComponent } from './submited-list/submited-list.component';
import { SuspendedListComponent } from './suspended-list/suspended-list.component';
import { PlusOneComponent } from './plus-one/plus-one.component';
import { FamilyOfFallenComponent } from './family-of-fallen/family-of-fallen.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';
import { CardModule, GridModule, TableModule } from '@coreui/angular';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RejectReasonModalComponent } from './modals/reject-reason-modal/reject-reason-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageModalComponent } from './modals/image-modal/image-modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'processing', pathMatch: 'full' },
  { path: 'processing', component: ProcessingListComponent },
  { path: 'submited', component: SubmitedListComponent },
  { path: 'approved', component: ApprovedListComponent },
  { path: 'rejected', component: RejectedListComponent },
  { path: 'suspended', component: SuspendedListComponent },
  { path: 'plus-one', component: PlusOneComponent },
  { path: 'family-of-fallen', component: FamilyOfFallenComponent },
];

@NgModule({
  declarations: [
    ProcessingListComponent,
    ApprovedListComponent,
    RejectedListComponent,
    SubmitedListComponent,
    SuspendedListComponent,
    PlusOneComponent,
    FamilyOfFallenComponent,
    RejectReasonModalComponent,
    ImageModalComponent
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
    SharedAdminModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class UserStatusModule { }
