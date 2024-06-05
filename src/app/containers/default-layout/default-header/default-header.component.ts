import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationFormComponent } from 'src/app/shared/notification-form/notification-form.component';

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

  constructor(private classToggler: ClassToggleService, private adminService: AdminService, private dialog: MatDialog) {
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

  openNotificationForm() {
    this.dialog.open(NotificationFormComponent, {
      width: '50%',
      data: {
        id: 'defender-mobile'
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
