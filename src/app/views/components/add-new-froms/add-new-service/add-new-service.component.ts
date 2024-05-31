import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, finalize, from } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss']
})
export class AddNewServiceComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  // propertyType!: string;
  subscription: Subscription[] = [];
  loading = false;
  pageSize = 10;
  offset = 0;
  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];
  lastPage: number = 0;
  fileName = '';
  // appSection: string = '';
  // orgType: string = '';
  searchCategoryText: string = '';
  categoryLoader: boolean = false;
  editMode = false;

  private router = inject(Router);

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCategories();
    // this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    // this.orgType = this.activatedRoute.snapshot.queryParams['orgType'];
    // this.appSection = this.activatedRoute.snapshot.queryParams['appSection'];
    this.editMode = this.activatedRoute.snapshot.queryParams['editMode'];
    this.initForm();
    if (this.activatedRoute.snapshot.queryParams['editMode'] === 'true') {
      this.editMode = true
      this.setFormValues();
    } else {
      this.editMode = false;
    }
    // this.initForm();
    // this.form.patchValue({
    //   propertyType: this.propertyType
    // })
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
      propertyType: ['service'],
      appSection: ['partner'],
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
      websites: [''],
      localContact: [''],
      franchiseTag: [''],
      umbrellaTag: [''],
      licenseNumber: [''],
      discount: [''],
      discountDisclaimer: [''],
      groupCode: [''],
      primaryCategory: [null],
      secondaryCategory: [''],
      description: [''],
      image: ['', [Validators.required]],
      isVetOwned: [false],
      locationActive: [true]
    })
  }

  setFormValues(): void {
    const data = window.history.state;
    if (data.primaryCategory.length && data.primaryCategory !== ' ') {
      this.getCategoryById(data.primaryCategory);
    }
    this.fileName = data.images[0];
    this.form.patchValue({
      propertyType: 'service',
      orgType: 'commercial',
      appSection: 'partner',
      locationName: data.locationName,
      corpName: data.corpName,
      email: data.email,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      county: data.county,
      phone: data.phone,
      websites: data?.website[0] || (data?.websites?.length && data?.websites[0]),
      primaryCategory: (data.primaryCategory && data.primaryCategory !== ' ') ? data.primaryCategory : null,
      secondaryCategory: (data.secondaryCategory && data.secondaryCategory !== ' ') ? data.secondaryCategory : null,
      discount: data.discount,
      description: data.description,
      image: this.fileName,
      locationActive: data.locationActive,
      country: data.country,
      localContact: data.localContact,
      franchiseTag: data.franchiseTag,
      umbrellaTag: data.umbrellaTag,
      licenseNumber: data.licenseNumber,
      discountDisclaimer: data.discountDisclaimer,
      groupCode: data.groupCode
    });
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  // onSubmit(): void {
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     if (!this.form.value.image || this.form.value.image === '') {
  //       this.adminService.imageValidation.next(true);
  //     }
  //     return;
  //   }

  //   const data: any = {};
  //   for (const control in this.form.controls) {
  //     if (this.form.controls[control].value === '' || this.form.controls[control].value === null) {
  //       data[control] = ' ';
  //     } else {
  //       data[control] = this.form.controls[control].value;
  //       data['corpName'] = this.form.controls['locationName'].value
  //     }
  //   }
  //   if (!this.form.value.image || this.form.value.image === '') {
  //     this.adminService.imageValidation.next(true);
  //     return;
  //   }

  //   const formData = new FormData()
  //   for (const key in data) {
  //     formData.append(key, data[key]);
  //   }
  //   this.loading = true;
  //   this.subscription.push(
  //     this.adminService.createPartner(formData).pipe(
  //       finalize(() => { this.loading = false })
  //     ).subscribe(res => {
  //       console.log(res);
  //       // this.uploadImage();
  //       alert('New partner added successfully.');
  //       this.fileName = '';
  //       this.initForm();
  //     }, err => {
  //       console.log(err);
  //     })
  //   )

  // }

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
        // data['corpName'] = this.form.controls['locationName'].value

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
        alert('New location added successfully.');
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
        alert('Location updated successfully.');
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


  // uploadImage(): void {
  //   console.log(this.form.value);

  //   const fromValue = this.form.value;
  //   const formData = new FormData();
  //   formData.append('propertyId', '64fe39691d940f22f1b06d2c');
  //   formData.append('image', fromValue.image);
  //   this.subscription.push(
  //     this.adminService.uploadProfile(formData).subscribe(res => {
  //       console.log(res);
  //       this.router.navigateByUrl('/admin/franchises');
  //     })
  //   );
  // }

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
