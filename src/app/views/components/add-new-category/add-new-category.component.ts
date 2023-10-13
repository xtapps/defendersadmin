import { Location } from '@angular/common';
import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  editMode = false;
  subscription: Subscription[] = [];
  receivedData: any;
  fileName = '';
  isFileAdded = false;
  loading = false;

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

  initForm(): void {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryType: ['partner'],
      website: [''],
      appSection: ['partner'],
      categoryIcon: [''],
    })
  }

  setFormValues(): void {
    const datas = window.history.state;
    this.form.patchValue({
      categoryName: datas.franchiseName,
      website: datas.website,
      categoryIcon: datas.categoryIcon
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
      this.form.controls['categoryIcon'].setValue(files[0]);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['categoryIcon'].setValue('');
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

    this.loading = true;
    if (this.editMode) {
      this.update(data);
    } else {
      this.submit(data);
    }
  }

  submit(data: any): void {
    this.subscription.push(
      this.adminService.createCategory(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        if (this.isFileAdded) {
          this.uploadImage(res);
        }
      })
    );
  }

  update(data: any): void {
    data['id'] = window.history.state._id;
    this.subscription.push(
      this.adminService.updateProperties(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        if (this.isFileAdded) {
          this.uploadImage(res);
        }
      })
    );
  }

  uploadImage(data: any): void {
    const fromValue = this.form.value;
    const formData = new FormData();
    formData.append('propertyId', data._id);
    formData.append('image', fromValue.image);
    this.subscription.push(
      this.adminService.uploadProfile(formData).subscribe(res => {
        alert('Success')
        this.router.navigateByUrl('/admin/websites');
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
