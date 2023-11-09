import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, finalize, from } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-partner',
  templateUrl: './add-new-partner.component.html',
  styleUrls: ['./add-new-partner.component.scss']
})
export class AddNewPartnerComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  propertyType!: string;
  subscription: Subscription[] = [];
  loading = false;
  pageSize = 10;
  offset = 1;
  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];
  lastPage: number = 0;
  fileName = '';

  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    this.form.patchValue({
      propertyType: this.propertyType
    })
  }


  getCategories(): void {
    this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
      const newData = res.categories;
      this.lastPage = Math.ceil(res.totalCount / this.pageSize);

      this.allPrimaryCategories = [...this.allPrimaryCategories, ...newData];
      this.parimaryCategories = newData;

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

  }


  initForm(): void {
    this.form = this.fb.group({
      locationName: ['', [Validators.required]],
      corpName: [''],
      propertyType: ['partner'],
      appSection: [''],
      orgType: ['commercial'],
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
      primaryCategory: [null],
      secondaryCategory: [''],
      description: [''],
      image: ['', [Validators.required]],
      isVetOwned: [false],
      isActive: [true]
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

    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.loading = true;
    this.subscription.push(
      this.adminService.createPartner(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        // this.uploadImage();
      }, err => {
        console.log(err);
      })
    )

  }


  uploadImage(): void {
    console.log(this.form.value);

    const fromValue = this.form.value;
    const formData = new FormData();
    formData.append('propertyId', '64fe39691d940f22f1b06d2c');
    formData.append('image', fromValue.image);
    this.subscription.push(
      this.adminService.uploadProfile(formData).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/admin/franchises');
      })
    );
  }

  onScrollToEnd(isScrollToEnd: boolean): void {
    console.log(isScrollToEnd, 'iiii');
    if (isScrollToEnd) {
      this.offset += 1;
      if (this.offset <= this.lastPage) {
        this.getCategories();
      }
    }
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

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
