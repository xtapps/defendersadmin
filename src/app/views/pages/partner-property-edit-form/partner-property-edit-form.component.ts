import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-partner-property-edit-form',
  templateUrl: './partner-property-edit-form.component.html',
  styleUrls: ['./partner-property-edit-form.component.scss']
})
export class PartnerPropertyEditFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription: Subscription[] = [];
  loading = false;
  fileName = '';
  isFileAdded = false;
  propertyDetails: any;

  pageSize = 10;
  lastPage: number = 0;
  offset = 1;

  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];
  propertyId: any;
  searchCategoryText: string = '';
  categoryLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.queryParams['propertyId'];
    this.initForm();
    this.getPropertyByPartnerId();
    this.getCategories();
  }

  getPropertyByPartnerId() {
    this.subscription.push(
      this.adminService.getPropertyByPartnerId(this.propertyId).subscribe(res => {
        this.propertyDetails = res;
        this.setFormValues(res);
      })
    )
  }

  setFormValues(data: any): void {
    if (data.primaryCategory.length && data.primaryCategory !== ' ') {
      this.getCategoryById(data.primaryCategory);
    }
    this.fileName = data.images[0];
    this.form.patchValue({
      propertyType: data.propertyType,
      orgType: data.orgType,
      appSection: data.appSection,
      locationName: data.locationName,
      email: data.email,
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
      image: data.images[0],
      locationActive: data.locationActive
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      locationName: ['', [Validators.required]],
      corpName: [''],
      propertyType: [''],
      appSection: [''],
      orgType: [''],
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
        data[control] = '';
      } else {
        if (control !== 'image') {
          data[control] = this.form.controls[control].value;
          data['corpName'] = this.form.controls['locationName'].value
        }

      }
    }
    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
    }

    this.loading = true;
    // if (this.editMode) {
      this.update(data);
    // } else {
    //   this.submit(data);
    // }

  }

  // submit(data: any): void {
  //   const formData = new FormData()
  //   for (const key in data) {
  //     formData.append(key, data[key]);
  //   }
  //   this.subscription.push(
  //     this.adminService.createProperties(formData).pipe(
  //       finalize(() => { this.loading = false })
  //     ).subscribe(res => {
  //       console.log(res);
  //       // this.uploadImage(res);
  //       alert('New partner added successfully.');
  //       this.initForm();
  //       this.fileName = '';
  //     })
  //   );
  // }

  update(data: any): void {
    data['propertyId'] = this.propertyId;
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.subscription.push(
      this.adminService.updatePartnerProperty(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        const data = {
          type: 'success',
          message: 'Partner updated successfully.'
        };
        this.adminService.alertMessage.next(data);
        // alert('Partner updated successfully.');
        // this.getPropertyById(window.history.state._id);
      }, err => {
        console.log(err)
        if (err.status === 201) {
          const data = {
            type: 'success',
            message: 'Partner updated successfully.'
          };
          this.adminService.alertMessage.next(data);
          // alert('Job opportunity updated successfully.');
        }
      })
    );
  }

  // getPropertyById(id: string) {
  //   this.subscription.push(
  //     this.adminService.getPropertyById(id).subscribe(res => {
  //       this.location.replaceState(this.location.path(), '', res);
  //       this.setFormValues();
  //     })
  //   )
  // }

  // uploadImage(data: any): void {
  //   console.log(this.form.value);

  //   const fromValue = this.form.value;
  //   const formData = new FormData();
  //   formData.append('propertyId', data._id);
  //   formData.append('image', fromValue.image);
  //   this.subscription.push(
  //     this.adminService.uploadProfile(formData).subscribe(res => {
  //       console.log(res);
  //       alert('Success')
  //       this.router.navigateByUrl('/admin/apps');
  //     })
  //   );
  // }

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

  addOpportunity() {
    this.router.navigate(['partnerDashboard/job'], { queryParams: { propertyId: this.propertyId, jobCompanyName: this.propertyDetails.locationName } });
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
