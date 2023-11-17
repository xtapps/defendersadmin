import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music/music.component';
import { PodcastsComponent } from './podcasts/podcasts.component';
import { StreamingComponent} from './streaming/streaming.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule, CardModule, GridModule, TableModule } from '@coreui/angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';


const routes: Routes = [
  {
    path: '', redirectTo: 'music', pathMatch: 'full',
  },
  {
    path: 'music', component: MusicComponent
  },
  {
    path: 'podcasts', component: PodcastsComponent
  },
  {
    path: 'streaming', component: StreamingComponent
  }
]


@NgModule({
  declarations: [
    MusicComponent,
    StreamingComponent,
    PodcastsComponent
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
export class EntertainmentModule { }
