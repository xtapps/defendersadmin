import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-properties',
  templateUrl: './add-new-properties.component.html',
  styleUrls: ['./add-new-properties.component.scss']
})
export class AddNewPropertiesComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  propertyType!: string;
  appSection!: string;
  orgType!: string;
  subscription: Subscription[] = [];
  loading = false;
  fileName = '';
  editMode = false;
  isFileAdded = false;

  pageSize = 10;
  lastPage: number = 0;
  offset = 1;
  searchCategoryText: string = '';
  categoryLoader: boolean = false;

  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];

  private router = inject(Router);

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
    const datas = window.history.state;
    if (datas.primaryCategory.length && datas.primaryCategory !== ' ') {
      this.getCategoryById(datas.primaryCategory);
    }
    this.fileName = datas.images[0];
    this.form.patchValue({
      propertyType: this.propertyType,
      orgType: this.orgType,
      appSection: this.appSection,
      locationName: datas.locationName,
      email: datas.email,
      address1: datas.address1,
      address2: datas.address2,
      city: datas.city,
      state: datas.state,
      zip: datas.zip,
      county: datas.county,
      phone: datas.phone,
      website: datas.website,
      primaryCategory: (datas.primaryCategory && datas.primaryCategory !== ' ') ? datas.primaryCategory : null,
      secondaryCategory: (datas.secondaryCategory && datas.secondaryCategory !== ' ') ? datas.secondaryCategory : null,
      discount: datas.discount,
      description: datas.description,
      image: datas.image,
      locationActive: datas.locationActive
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      locationName: ['', [Validators.required]],
      corpName: [''],
      propertyType: [this.propertyType],
      appSection: [this.appSection],
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
      image: [''],
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
      this.adminService.getAllCategories(this.pageSize, this.offset, this.searchCategoryText).subscribe((res: any) => {
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
    console.log(this.form.value);
    console.log(window.history.state._id);

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
        // this.uploadImage(res);
        alert('New partner added successfully.');
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
        alert('Partner updated successfully.');
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

  uploadImage(data: any): void {
    console.log(this.form.value);

    const fromValue = this.form.value;
    const formData = new FormData();
    formData.append('propertyId', data._id);
    formData.append('image', fromValue.image);
    this.subscription.push(
      this.adminService.uploadProfile(formData).subscribe(res => {
        console.log(res);
        alert('Success')
        this.router.navigateByUrl('/admin/apps');
      })
    );
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


  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
