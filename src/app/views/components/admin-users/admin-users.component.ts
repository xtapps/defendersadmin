import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UsersModel } from '../model/users.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent extends UsersModel implements OnInit, OnDestroy {

  adminUsers: any[] = []
  subscription: Subscription[] = [];
  isLoading = true;

  constructor(
    private adminService: AdminService,
    public override router: Router
  ) {
    super(router);
  }

  ngOnInit(): void {
    this.getAdminUsers();
  }

  getAdminUsers(): void {
    this.isLoading = true;
    this.subscription.push(
      this.adminService.getAdminUsers().subscribe((res: any) => {
        this.isLoading = false;
        this.adminUsers = res;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
