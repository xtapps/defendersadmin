import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PartnerLoginComponent } from './partner-login/partner-login.component';
import { PartnerTableListComponent } from './partner-table-list/partner-table-list.component';
import { PartnerPropertyEditFormComponent } from './partner-property-edit-form/partner-property-edit-form.component';
import { PartnerAddJobOpportunityComponent } from './partner-add-job-opportunity/partner-add-job-opportunity.component';
import { PartnerViewPageComponent } from './partner-view-page/partner-view-page.component';
import { PartnerJobOpportunitiesListComponent } from './partner-job-opportunities-list/partner-job-opportunities-list.component';
import { PartnerAuthGuard } from './../../services/auth-guard-partner.service';

const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'propertiesList',
    component: PartnerTableListComponent,
    canActivate: [PartnerAuthGuard],
    // data: {
    //   title: 'Properties list'
    // }
  },
  {
    path: 'jobOpportunitiesList',
    component: PartnerJobOpportunitiesListComponent,
    canActivate: [PartnerAuthGuard],
    // data: {
    //   title: 'My job list'
    // }
  },
  {
    path: 'property',
    component: PartnerPropertyEditFormComponent,
    canActivate: [PartnerAuthGuard],
    // data: {
    //   title: 'Property'
    // }
  },
  {
    path: 'job',
    component: PartnerAddJobOpportunityComponent,
    canActivate: [PartnerAuthGuard],
    // data: {
    //   title: 'Job opportunity'
    // }
  },
  {
    path: 'viewDetails',
    component: PartnerViewPageComponent,
    canActivate: [PartnerAuthGuard],
    // data: {
    //   title: 'Property details'
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
