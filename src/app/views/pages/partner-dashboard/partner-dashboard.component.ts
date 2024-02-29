import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.scss']
})
export class PartnerDashboardComponent implements OnInit, OnDestroy {

  // showPropertyPage: boolean = true;

  alertMessage: any = {};
  showAlertMessage: boolean = false;
  showLoader: boolean = false;

  subscriptions: Subscription[] = [];

  navItems: INavData[] = [
    {
      name: 'Listings',
      url: '/partnerDashboard/propertiesList',
      iconComponent: { name: 'cil-location-pin' }
    },
    {
      name: 'My Job Listings',
      url: '/partnerDashboard/jobOpportunitiesList',
      iconComponent: { name: 'cil-list' }
    }
  ]

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((evt: any) => {
        if (evt?.routerEvent?.url === '/partnerDashboard') {
          this.router.navigate(['/partnerDashboard/propertiesList']);
          return;
        }
      })
    )

    this.subscriptions.push(
      this.adminService.alertMessage.subscribe(res => {
        this.alertMessage = res;
        this.showAlertMessage = true;
        setTimeout(() => {
          this.showAlertMessage = false;
        }, 3000);
      })
    )

    this.subscriptions.push(
      this.adminService.showLoader.subscribe(res => {
        this.showLoader = res;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
