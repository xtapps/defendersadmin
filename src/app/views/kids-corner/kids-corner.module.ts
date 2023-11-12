import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { BooksPlusComponent } from './books-plus/books-plus.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, GridModule, TableModule } from '@coreui/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';


const routes: Routes = [
  {
    path: '', redirectTo: 'games', pathMatch: 'full',
  },
  {
    path: 'games', component: GamesComponent
  },
  {
    path: 'book-plus', component: BooksPlusComponent
  }
]


@NgModule({
  declarations: [
    GamesComponent,
    BooksPlusComponent
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
    ButtonModule
  ]
})
export class KidsCornerModule { }
