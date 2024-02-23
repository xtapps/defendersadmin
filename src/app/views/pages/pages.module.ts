import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerLoginComponent } from './partner-login/partner-login.component';
import { PartnerPropertyEditFormComponent } from './partner-property-edit-form/partner-property-edit-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { PartnerFooterComponent } from './partner-footer/partner-footer.component';
import { PartnerHeaderComponent } from './partner-header/partner-header.component';
import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  TableModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { FileUploadComponent } from './../../shared/file-upload/file-upload.component';
import { PartnerAddJobOpportunityComponent } from './partner-add-job-opportunity/partner-add-job-opportunity.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { PartnerTableListComponent } from './partner-table-list/partner-table-list.component';
import { SharedAdminModule } from 'src/app/shared/shared-admin.module';
import { PartnerViewPageComponent } from './partner-view-page/partner-view-page.component';
import { MatIconModule } from '@angular/material/icon';
import { PartnerJobOpportunitiesListComponent } from './partner-job-opportunities-list/partner-job-opportunities-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    PartnerLoginComponent,
    PartnerPropertyEditFormComponent,
    PartnerDashboardComponent,
    PartnerFooterComponent,
    PartnerHeaderComponent,
    FileUploadComponent,
    PartnerAddJobOpportunityComponent,
    PartnerTableListComponent,
    PartnerViewPageComponent,
    PartnerJobOpportunitiesListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    NgSelectModule,
    AlertModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    FooterModule,
    FormModule,
    GridModule,
    HeaderModule,
    ListGroupModule,
    NavModule,
    ProgressModule,
    SharedModule,
    SidebarModule,
    TabsModule,
    UtilitiesModule,
    TableModule,
    MatChipsModule,
    MatFormFieldModule,
    NgScrollbarModule,
    SharedAdminModule,
    MatIconModule
  ],
  providers: [
    IconSetService
  ]
})
export class PagesModule {
}
