import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-app',
  templateUrl: './add-new-app.component.html',
  styleUrls: ['./add-new-app.component.scss']
})
export class AddNewAppComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  propertyType!: string;
  loading = false;
  subscription: Subscription[] = [];
  fileName = '';


  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);


  ngOnInit(): void {
    this.initForm();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    this.form.patchValue({
      propertyType: this.propertyType
    })
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      locationName: [''],
      image: ['', [Validators.required]],
      androidURL: [''],
      appleURL: [''],
      email: [''],
      propertyType: ['app'],
      orgType: ['commercial'],
      corpName: [''],
      description: [''],
      appSection: ['entertainment'],
      website: ['www.gmail.com'],
      isActive: [true],
      isVetOwned: [false],
      locationActive: [true]
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
        data['corpName'] = this.form.controls['name'].value
        data['locationName'] = this.form.controls['name'].value
      }
    }

    console.log(data);

    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    // return;
    this.loading = true;
    this.subscription.push(
      this.adminService.createPartner(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('App added successfully.');
        this.initForm();
        this.fileName = '';
        // this.uploadImage(res);
      })
    )

  }

  uploadImage(data: any): void {
    console.log(this.form.value);

    const fromValue = this.form.value;
    const formData = new FormData();
    formData.append('propertyId', data._id);
    // formData.append('propertyId', '650b4dd86b4a95695b39ba00');
    formData.append('image', fromValue.image);
    this.subscription.push(
      this.adminService.uploadProfile(formData).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/admin/apps');
      })
    );
  }

  onFileChange(file: any) {
    if (file) {
      this.fileName = file.name;
      this.form.controls['image'].setValue(file);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['image'].setValue('');
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
