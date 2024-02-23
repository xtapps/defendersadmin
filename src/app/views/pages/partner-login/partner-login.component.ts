import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-partner-login',
  templateUrl: './partner-login.component.html',
  styleUrls: ['./partner-login.component.scss']
})
export class PartnerLoginComponent implements OnInit, OnDestroy {

  public focus: any;
  public focus1: any;
  public userName: string = '';
  public password: string = '';
  public userNameErrMsg: boolean = false;
  public passwordErrMsg: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['partnerDashboard/properties']);
    }
  }

  onSignInClick() {
    if (this.userName.length <= 0) {
      this.userNameErrMsg = true;
      return;
    }
    if (this.password.length <= 0) {
      this.passwordErrMsg = true;
      return;
    }

    this.userNameErrMsg = false;
    this.passwordErrMsg = false;
    const data = {
      email: this.userName,
      password: this.password
    };
    this.subscriptions.push(
      this.adminService.partnerLogin(data).subscribe(res => {
        localStorage.setItem('token', res.token);
        const userDetails = {
          firstName: res.firstName,
          chatPhoto: res.chatPhoto,
          username: res.username,
          userId: res.userId,
          userType: 'partnerLogin'
        }
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        this.router.navigate(['partnerDashboard/properties']);
      }, err => {
        console.log(err);
        alert(err.error)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
