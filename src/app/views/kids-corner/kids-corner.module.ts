import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { BooksPlusComponent } from './books-plus/books-plus.component';
import { RouterModule, Routes } from '@angular/router';


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
    RouterModule.forChild(routes)
  ]
})
export class KidsCornerModule { }
