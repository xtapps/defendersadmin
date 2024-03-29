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
  offset = 0;
  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];
  lastPage: number = 0;
  fileName = '';
  appSection: string = '';
  orgType: string = '';
  searchCategoryText: string = '';
  categoryLoader: boolean = false;

  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    this.orgType = this.activatedRoute.snapshot.queryParams['orgType'];
    this.appSection = this.activatedRoute.snapshot.queryParams['appSection'];
    this.initForm();
    this.form.patchValue({
      propertyType: this.propertyType
    })
  }


  getCategories(): void {
    this.categoryLoader = true;
    this.adminService.getAllCategories(this.pageSize, this.offset, this.searchCategoryText).subscribe((res: any) => {
      const newData = res.categories;
      this.lastPage = res.totalCount;
      this.categoryLoader = false;

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
      propertyType: [this.propertyType],
      appSection: [this.appSection ? this.appSection : 'partner'],
      orgType: [this.orgType],
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
      locationActive: [true]
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (!this.form.value.image || this.form.value.image === '') {
        this.adminService.imageValidation.next(true);
      }
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
    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
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
        alert('New partner added successfully.');
        this.fileName = '';
        this.initForm();
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
    if (isScrollToEnd) {
      this.offset += this.pageSize;
      if (this.offset <= this.lastPage) {
        this.getCategories();
      }
    }
  }

  onSearchCategory(event: any) {
    this.searchCategoryText = event?.term ?? '';
    this.allPrimaryCategories = [];
    this.getCategories();
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

  selectPrimaryCategory(event: any) {
    if (!event) {
      this.secondaryCategories = [];
      this.form.controls['secondaryCategory'].setValue('');
    } else {
      this.allPrimaryCategories.forEach(val => {
        if (val._id === event) {
          this.secondaryCategories = val.subCategories;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
