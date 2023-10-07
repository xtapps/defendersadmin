import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';


@NgModule({
  declarations: [
    CustomPaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CustomPaginationComponent
  ]
})
export class SharedAdminModule { }
