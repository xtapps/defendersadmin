import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm!: FormGroup;
  isInvalid = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    if (formValue.username === 'nithil.defendersGateway.com' && formValue.password === '123456') {
      this.isInvalid = false;
      this.router.navigateByUrl('/dashboard');
    } else {
      this.isInvalid = true;
    }

  }

}
