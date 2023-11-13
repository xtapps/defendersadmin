import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-group-codes',
  templateUrl: './add-group-codes.component.html',
  styleUrls: ['./add-group-codes.component.scss']
})
export class AddGroupCodesComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  subscription: Subscription[] = [];
  editMode = false

  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit(): void {
    this.initForm();
    this.editMode = this.activatedRoute.snapshot.queryParams['editMode'];
    if (this.activatedRoute.snapshot.queryParams['editMode'] === 'true') {
      this.editMode = true
      this.setFormValues();
    } else {
      this.editMode = false;
    }
  }

  setFormValues(): void {
    const data = window.history.state;
    this.form.patchValue({
      groupName: data.groupName,
      groupCode: data.groupCode,
      discountPrice: data.discountPrice
    })
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      groupName: ['', [Validators.required]],
      groupCode: ['', [Validators.required]],
      discountPrice: ['', [Validators.required]]
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: any = {};
    for (const control in this.form.controls) {
      if (this.form.controls[control].value === '' || this.form.controls[control].value === null) {
        data[control] = ' ';
      } else {
        data[control] = this.form.controls[control].value;
      }
    }

    this.loading = true;
    if (this.editMode) {
      this.update(data);
    } else {
      this.submit(data);
    }

  }

  submit(data: any): void {
    this.subscription.push(
      this.adminService.createGroupCode(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        alert('Group code added successfully.');
        this.initForm();        
      })
    );
  }

  update(data: any): void {
    data['id'] = window.history.state._id;
    this.subscription.push(
      this.adminService.updateGroupCode(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('Group code updated successfully.');
      })
    );
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
