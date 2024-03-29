import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { ValidateUserComponent } from './views/validate-user/validate-user.component';
import { AuthGuard } from './services/auth-guard.service';
import { PartnerLoginComponent } from './views/pages/partner-login/partner-login.component';
import { PartnerDashboardComponent } from './views/pages/partner-dashboard/partner-dashboard.component';
import { AuthAdminUrlGuard } from './services/auth-admin-url-guard.service';
import { AuthPartnerUrlGuard } from './services/auth-partner-url-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [AuthGuard, AuthAdminUrlGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'non-profits',
        loadChildren: () =>
          import('./views/non-profits/non-profits.module').then((m) => m.NonProfitsModule)
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./views/resources/resources.module').then((m) => m.ResourcesModule)
      },
      {
        path: 'kids-corner',
        loadChildren: () =>
          import('./views/kids-corner/kids-corner.module').then((m) => m.KidsCornerModule)
      },
      {
        path: 'health',
        loadChildren: () =>
          import('./views/health/health.module').then((m) => m.HealthModule)
      },
      {
        path: 'entertainment',
        loadChildren: () =>
          import('./views/entertainment/entertainment.module').then((m) => m.EntertainmentModule)
      },
      {
        path: 'user-status',
        loadChildren: () =>
          import('./views/user-status/user-status.module').then((m) => m.UserStatusModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    canActivate: [AuthAdminUrlGuard],
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    canActivate: [AuthAdminUrlGuard],
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthAdminUrlGuard],
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'partnerLogin',
    component: PartnerLoginComponent,
    canActivate: [AuthPartnerUrlGuard],
    data: {
      title: 'Partner Login Page'
    }
  },
  {
    path: 'partnerDashboard',
    component: PartnerDashboardComponent,
    canActivate: [AuthPartnerUrlGuard],
    data: {
      title: 'Partner Dashboard'
    },
    loadChildren: () => import('./views/pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthAdminUrlGuard],
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'validate/:defenderId',
    component: ValidateUserComponent,
    canActivate: [AuthAdminUrlGuard],
    data: {
      title: 'Validate User Page'
    }
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    loadChildren: () => import('./views/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AuthAdminUrlGuard]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      useHash: false
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
