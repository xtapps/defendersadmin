import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription, finalize, from } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  propertyType!: string;
  subscription: Subscription[] = [];
  loading = false;
  pageSize = 10;
  offset = 1;
  parimaryCategories: any[] = [];
  secondaryCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    console.log(this.propertyType);
    this.form.patchValue({
      propertyType: this.propertyType
    })
  }

  getCategories(): void {
    this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
      this.parimaryCategories = res.categories;
    })
  }

  getPrimaryCategory(item: any): void {
    this.form.controls['secondaryCategory'].setValue('');
    console.log(item.value);
    this.parimaryCategories.forEach(el => {
      if (el._id === item.value) {
        this.secondaryCategories = el.subCategories;
      }
    })

    // this.secondaryCategories = item.subCategories;
  }

  initForm(): void {
    this.form = this.fb.group({
      locationName: ['', [Validators.required]],
      corpName: ['', [Validators.required]],
      propertyType: [''],
      appSection: ['', [Validators.required]],
      orgType: ['', [Validators.required]],
      androidUrl: [''],
      appleUrl: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: ['us'],
      county: [''],
      phone: [''],
      email: ['', [Validators.email]],
      website: [''],
      localContact: [''],
      franchiseTag: [''],
      umbrellaTag: [''],
      licenseNumber: [''],
      discount: [''],
      discountClaimer: [''],
      groupCode: [''],
      primaryCategory: [''],
      secondaryCategory: [''],
      description: [''],
      images: [''],
      isVetOwned: [false]
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
      if (this.form.controls[control].value === '') {
        data[control] = ' ';
      } else {
        data[control] = this.form.controls[control].value;
      }
    }

    console.log(data);
    return;
    this.loading = true;
    this.subscription.push(
      this.adminService.createPartner(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);

      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
