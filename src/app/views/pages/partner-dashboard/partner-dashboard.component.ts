import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.scss']
})
export class PartnerDashboardComponent implements OnInit, OnDestroy {

  // showPropertyPage: boolean = true;

  subscriptions: Subscription[] = [];

  navItems: INavData[] = [
    {
      name: 'Properties',
      url: '/partnerDashboard/propertiesList',
      iconComponent: { name: 'cil-location-pin' }
    },
    {
      name: 'Jobs',
      url: '/partnerDashboard/jobOpportunitiesList',
      iconComponent: { name: 'cil-location-pin' }
    }
  ]

  constructor(
    private router: Router
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
