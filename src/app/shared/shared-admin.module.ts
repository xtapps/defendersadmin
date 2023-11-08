import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    CustomPaginationComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: [
    CustomPaginationComponent,
    PaginatorComponent
  ]
})
export class SharedAdminModule { }
