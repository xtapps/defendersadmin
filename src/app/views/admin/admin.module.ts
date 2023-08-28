import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { TableViewComponent } from '../table-view/table-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationComponent } from '../components/location/location.component';
import { WebsitesComponent } from '../components/websites/websites.component';
import { AppsListComponent } from '../components/apps-list/apps-list.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { GroupCodesComponent } from '../components/group-codes/group-codes.component';
import { DefendersListComponent } from '../components/defenders-list/defenders-list.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, ProgressModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';


@NgModule({
  declarations: [
    HomeComponent,
    TableViewComponent,
    LocationComponent,
    WebsitesComponent,
    AppsListComponent,
    CategoriesComponent,
    GroupCodesComponent,
    DefendersListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    AvatarModule,
    TableModule,
    ChartjsModule,
    WidgetsModule
  ]
})
export class AdminModule { }
