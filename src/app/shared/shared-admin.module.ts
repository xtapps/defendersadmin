import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { SearchFormComponent } from './search-form/search-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    CustomPaginationComponent,
    PaginatorComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    CustomPaginationComponent,
    PaginatorComponent,
    SearchFormComponent
  ]
})
export class SharedAdminModule { }
