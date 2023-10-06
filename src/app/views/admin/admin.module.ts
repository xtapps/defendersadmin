import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { TableViewComponent } from '../components/table-view/table-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationComponent } from '../components/location/location.component';
import { WebsitesComponent } from '../components/websites/websites.component';
import { AppsListComponent } from '../components/apps-list/apps-list.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { GroupCodesComponent } from '../components/group-codes/group-codes.component';
import { DefendersListComponent } from '../components/defenders-list/defenders-list.component';
import { AvatarModule, ButtonGroupModule, ButtonModule, CardModule, FormModule, GridModule, NavModule, PaginationComponent, ProgressModule, SharedModule, TableModule, TabsModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { WidgetsModule } from '../widgets/widgets.module';
import { AddNewComponent } from '../components/add-new/add-new.component';
import { FranchisesListComponent } from '../components/franchises-list/franchises-list.component';
import { ViewPageComponent } from '../components/view-page/view-page.component';
import { JobBoardsComponent } from '../components/job-boards/job-boards.component';
import { JobOpportunitiesComponent } from '../components/job-opportunities/job-opportunities.component';
import { BusinessOpportunitiesComponent } from '../components/business-opportunities/business-opportunities.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddNewPartnerComponent } from '../components/add-new-froms/add-new-partner/add-new-partner.component';
import { AddNewAppComponent } from '../components/add-new-froms/add-new-app/add-new-app.component';
import { AddNewFranchisesComponent } from '../components/add-new-froms/add-new-franchises/add-new-franchises.component';
import { AddNewWebsiteComponent } from '../components/add-new-froms/add-new-website/add-new-website.component';
import { SharedAdminModule } from '../../shared/shared-admin.module'
import { AddJobBoadrsComponent } from '../components/add-job-boadrs/add-job-boadrs.component';
import { AddNewCategoryComponent } from '../components/add-new-category/add-new-category.component';


@NgModule({
  declarations: [
    HomeComponent,
    TableViewComponent,
    LocationComponent,
    WebsitesComponent,
    AppsListComponent,
    CategoriesComponent,
    GroupCodesComponent,
    DefendersListComponent,
    AddNewComponent,
    FranchisesListComponent,
    ViewPageComponent,
    JobBoardsComponent,
    JobOpportunitiesComponent,
    BusinessOpportunitiesComponent,
    AddNewPartnerComponent,
    AddNewAppComponent,
    AddNewFranchisesComponent,
    AddNewWebsiteComponent,
    AddNewCategoryComponent,
    AddJobBoadrsComponent
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
    WidgetsModule,
    NgSelectModule,
    SharedModule,
    SharedAdminModule
  ]
})
export class AdminModule { }
