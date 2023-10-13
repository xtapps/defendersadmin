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
  propertyType!: string;
  loading = false;
  subscription: Subscription[] = [];
  fileName = '';
  appSection!: string;
  orgType!: string;
  editMode = false
  isFileAdded = false;

  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit(): void {
    this.initForm();
    this.propertyType = this.activatedRoute.snapshot.queryParams['propertyType'];
    this.orgType = this.activatedRoute.snapshot.queryParams['orgType'];
    this.appSection = this.activatedRoute.snapshot.queryParams['appSection'];
    this.editMode = this.activatedRoute.snapshot.queryParams['editMode'];
    this.form.patchValue({
      propertyType: this.propertyType
    })
    if (this.activatedRoute.snapshot.queryParams['editMode'] === 'true') {
      this.editMode = true
      this.setFormValues();
    } else {
      this.editMode = false;
    }
  }

  setFormValues(): void {
    const datas = window.history.state;
    this.fileName = datas.images;
    this.form.patchValue({
      locationName: datas.locationName,
      image: datas.images,
      website: datas.website,
      propertyType: this.propertyType,
      orgType: this.orgType,
      description: datas.description,
      discount: datas.discount,
      discountDisclaimer: datas.discountDisclaimer,
      appSection: this.appSection,
      isVetOwned: datas.isVetOwned,
      locationActive: datas.locationActive
    })
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      locationName: ['', [Validators.required]],
      images: ['', [Validators.required]],
      website: [''],
      propertyType: [''],
      orgType: ['commercial'],
      description: [''],
      discount: [''],
      discountDisclaimer: [''],
      appSection: [''],
      isVetOwned: [false],
      locationActive: [false]
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
        data['corpName'] = this.form.controls['locationName'].value
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
      this.adminService.createProperties(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        this.uploadImage(res);
      })
    );
  }

  update(data: any): void {
    data['propertyId'] = window.history.state._id;
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
        console.log(res);
        alert('Success')
        this.router.navigateByUrl('/admin/websites');
      })
    );
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;

    if (files && files.length > 0) {
      this.fileName = files[0].name;
      this.isFileAdded = true;
      this.form.controls['images'].setValue(files[0]);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.isFileAdded = false;
      this.form.controls['images'].setValue('');
    }
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }



}
