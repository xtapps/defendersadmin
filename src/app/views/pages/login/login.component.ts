import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  authForm!: FormGroup;
  isInvalid = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    let data: any = localStorage.getItem('userDetails');
    if (data) {
      data = JSON.parse(data);
      if (data.userType === "partnerLogin") {
        this.router.navigate(['/partnerDashboard'])
        return;
      }
    }
    this.initForm();
  }

  initForm(): void {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(): void {
    const formValue = this.authForm.value;
    if (!formValue.username || !formValue.password) {
      this.isInvalid = true;
      return;
    }
    const data = {
      email: formValue.username,
      password: formValue.password,
      device: '',
      deviceBrand: ''
    }
    const loginSub = this.adminService.login(data).subscribe(res => {
      localStorage.setItem('token', res.response.token);
      const userDetails = {
        firstName: res.response.firstName,
        lastName: res.response.lastName,
        email: res.response.email,
        userID: res.response.userID
      }
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      this.router.navigateByUrl('/dashboard');
    }, err => {
      console.log(err);
    });
    this.subscriptions.push(loginSub);
    // if (formValue.username === 'nithil.defendersGateway.com' && formValue.password === '123456') {
    //   this.isInvalid = false;
    //   this.router.navigateByUrl('/dashboard');
    // } else {
    //   this.isInvalid = true;
    // }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
