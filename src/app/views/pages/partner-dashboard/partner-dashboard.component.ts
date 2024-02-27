import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.scss']
})
export class PartnerDashboardComponent implements OnInit {

  showPropertyPage: boolean = true;

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
    if (this.router.url === '/partnerDashboard') {
      this.router.navigate(['/partnerDashboard/propertiesList']);
    }
    if (this.router.url.search('/partnerDashboard/propertiesList') >= 0) {
      this.showPropertyPage = true;
    } else {
      this.showPropertyPage = false;
    }
  }

}
