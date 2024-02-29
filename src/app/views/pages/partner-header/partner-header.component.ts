import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-partner-header',
  templateUrl: './partner-header.component.html',
})
export class PartnerHeaderComponent extends HeaderComponent implements OnInit, OnDestroy {

  @Input() sidebarId: string = "sidebar";

  userDetails: any;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    const userDetails: any = localStorage.getItem('userDetails');
    this.userDetails = JSON.parse(userDetails);
  }

  logout() {
    let userDetails: any = localStorage.getItem('userDetails');
    userDetails = JSON.parse(userDetails);
    const data = {
      id: userDetails.userId
    }
    const userDetailsSub = this.adminService.partnerLogout(data).subscribe(res => {
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      this.router.navigate(['/partnerLogin']);
    });
    this.subscriptions.push(userDetailsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
