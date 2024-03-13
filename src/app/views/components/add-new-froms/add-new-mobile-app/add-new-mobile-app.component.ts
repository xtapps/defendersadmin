import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-mobile-app',
  templateUrl: './add-new-mobile-app.component.html',
  styleUrls: ['./add-new-mobile-app.component.scss']
})
export class AddNewMobileAppComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  propertyType!: string;
  appSection!: string;
  orgType!: string;
  subscription: Subscription[] = [];
  loading = false;
  appleIcon = '';
  androidIcon = '';
  editMode = false;
  isFileAdded = false;
  fileName = '';

  pageSize = 10;
  lastPage: number = 0;
  offset = 1;
  searchCategoryText: string = '';
  categoryLoader: boolean = false;

  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.propertyType = this.activatedRoute.snapshot.queryParams['propertyType'];
    this.orgType = this.activatedRoute.snapshot.queryParams['orgType'];
    this.appSection = this.activatedRoute.snapshot.queryParams['appSection'];
    this.editMode = this.activatedRoute.snapshot.queryParams['editMode'];
    this.initForm();
    if (this.activatedRoute.snapshot.queryParams['editMode'] === 'true') {
      this.editMode = true
      this.setFormValues();
    } else {
      this.editMode = false;
    }
  }

  setFormValues(): void {
    const data = window.history.state;
    if (data.primaryCategory.length && data.primaryCategory !== ' ') {
      this.getCategoryById(data.primaryCategory);
    }
    this.fileName = data.images[0];
    this.appleIcon = data.appleIcon;
    this.androidIcon = data.androidIcon;
    this.form.patchValue({
      propertyType: this.propertyType,
      orgType: this.orgType,
      appSection: this.appSection,
      locationName: data.locationName,
      // email: data.email,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      county: data.county,
      phone: data.phone,
      website: data.website,
      primaryCategory: (data.primaryCategory && data.primaryCategory !== ' ') ? data.primaryCategory : null,
      secondaryCategory: (data.secondaryCategory && data.secondaryCategory !== ' ') ? data.secondaryCategory : null,
      discount: data.discount,
      description: data.description,
      image: data.image,
      locationActive: data.locationActive,
      appleURL: data.appleURL,
      androidURL: data.androidURL
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      locationName: ['', [Validators.required]],
      corpName: [''],
      propertyType: [this.propertyType],
      appSection: [this.appSection],
      orgType: [this.orgType],
      androidURL: [''],
      appleURL: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zip: [''],
      country: ['us'],
      county: [''],
      phone: [''],
      // email: ['', [Validators.email]],
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
      isActive: [true],
      locationActive: [true]
    });
  }

  getCategoryById(id: string): void {
    this.subscription.push(
      this.adminService.getAllCategoryById(id).subscribe((res: any) => {
        if (res) {
          this.allPrimaryCategories = [...this.allPrimaryCategories, ...[res]];
          this.form.controls['primaryCategory'].setValue(res._id);
          res.subCategories.forEach((val: any) => {
            if (val._id.toString() === this.form.controls['secondaryCategory'].value.toString()) {
              this.form.controls['secondaryCategory'].setValue(val._id);
            }
          });
        } else {
          this.form.controls['primaryCategory'].setValue(null);
        }
      })
    );
  }

  selectPrimaryCategory(event: any) {
    if (!event) {
      this.secondaryCategories = [];
      this.form.controls['secondaryCategory'].setValue(null);
    } else {
      this.allPrimaryCategories.forEach(val => {
        if (val._id === event) {
          this.secondaryCategories = val.subCategories;
        }
      });
    }
  }

  getCategories(): void {
    this.categoryLoader = true;
    this.subscription.push(
      this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
        const newData = res.categories;
        this.lastPage = res.totalCount;
        this.categoryLoader = false;
        this.allPrimaryCategories = [...this.allPrimaryCategories, ...newData];
        this.parimaryCategories = newData;
      })
    );
  }

  getPrimaryCategory(item: any): void {
    this.form.controls['secondaryCategory'].setValue(null);
    this.parimaryCategories.forEach(el => {
      if (el._id === item.value) {
        this.secondaryCategories = el.subCategories;
      }
    });
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  onSubmit(): void {
    if (this.form.invalid && !this.editMode) {
      this.form.markAllAsTouched();
      if (!this.form.value.image || this.form.value.image === '') {
        this.adminService.imageValidation.next(true);
      }
      return;
    }

    const data: any = {};
    for (const control in this.form.controls) {
      if (this.form.controls[control].value === '' || this.form.controls[control].value === null) {
        data[control] = '';
      } else {
        data[control] = this.form.controls[control].value;
        data['corpName'] = this.form.controls['locationName'].value

      }
    }
    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
    }

    this.loading = true;
    if (this.editMode) {
      this.update(data);
    } else {
      this.submit(data);
    }

  }

  submit(data: any): void {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.subscription.push(
      this.adminService.createProperties(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        alert('New mobile app added successfully.');
        this.initForm();
        this.fileName = '';
      })
    );
  }

  update(data: any): void {
    data['propertyId'] = window.history.state._id;
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.subscription.push(
      this.adminService.updateProperties(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('Mobile app updated successfully.');
        this.getPropertyById(window.history.state._id);
      })
    );
  }

  getPropertyById(id: string) {
    this.subscription.push(
      this.adminService.getPropertyById(id).subscribe(res => {
        this.location.replaceState(this.location.path(), '', res);
        this.setFormValues();
      })
    )
  }

  onSearchCategory(event: any) {
    this.searchCategoryText = event?.term ?? '';
    this.allPrimaryCategories = [];
    this.getCategories();
  }

  onScrollToEnd(isScrollToEnd: boolean): void {
    if (isScrollToEnd) {
      this.offset += this.pageSize;
      if (this.offset <= this.lastPage) {
        this.getCategories();
      }
    }
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

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
