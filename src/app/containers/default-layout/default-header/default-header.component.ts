import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnDestroy {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  subscriptions: Subscription[] = [];

  constructor(private classToggler: ClassToggleService, private adminService: AdminService) {
    super();
  }

  logout() {
    let userDetails: any = localStorage.getItem('userDetails');
    userDetails = JSON.parse(userDetails);
    const data = {
      id: userDetails.userID,
      tokens: []
    }
    const userDetailsSub = this.adminService.updateUserDetails(data).subscribe(res => {
      this.adminService.logout();
    });
    this.subscriptions.push(userDetailsSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
