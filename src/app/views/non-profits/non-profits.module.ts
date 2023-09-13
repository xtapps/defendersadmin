import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MilitaryComponent } from './military/military.component';
import { FirstResponderComponent } from './first-responder/first-responder.component';
import { ChaplainComponent } from './chaplain/chaplain.component';
import { OtherComponent } from './other/other.component';

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
    OtherComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NonProfitsModule { }
