import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-franchises',
  templateUrl: './add-new-franchises.component.html',
  styleUrls: ['./add-new-franchises.component.scss']
})
export class AddNewFranchisesComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  fileName = '';
  subscription: Subscription[] = [];

  private formBuilder = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      website: [''],
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;

    if (files && files.length > 0) {
      this.fileName = files[0].name;
      this.form.controls['image'].setValue(files[0]);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['image'].setValue('');
    }
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
    console.log(data);
    return;
    this.subscription.push(
      this.adminService.createFranchises(data).subscribe(res => {
        this.router.navigateByUrl('/admin/franchises');
      })
    )

  }


  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
