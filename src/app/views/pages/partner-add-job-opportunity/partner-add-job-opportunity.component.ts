import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Location } from '@angular/common';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-partner-add-job-opportunity',
  templateUrl: './partner-add-job-opportunity.component.html',
  styleUrls: ['./partner-add-job-opportunity.component.scss']
})
export class PartnerAddJobOpportunityComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription: Subscription[] = [];
  loading = false;
  fileName = '';
  isFileAdded = false;
  jobDetails: any;

  pageSize = 10;
  lastPage: number = 0;
  offset = 1;
  propertyId: any;
  jobCompanyName: any;
  jobId: any;

  allPrimaryCategories: any[] = []; // Array to hold all data
  parimaryCategories: any[] = []; // Array for current page data
  secondaryCategories: any[] = [];
  fruits: any = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  skills: any = [];
  responsibilities: any = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private location: Location,
    private router: Router,
    private announcer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.jobId = this.activatedRoute.snapshot.queryParams['jobId'];
    this.getCategories();
    this.initForm();
    if (this.jobId) {
      this.getJobId();
      return;
    }
    this.propertyId = this.activatedRoute.snapshot.queryParams['propertyId'];
    this.jobCompanyName = this.activatedRoute.snapshot.queryParams['jobCompanyName'];
    this.form.controls['jobCompany'].setValue(this.propertyId);
    this.form.controls['jobCompanyName'].setValue(this.jobCompanyName);
  }

  setFormValues(data: any): void {
    this.fileName = data.logo;
    this.form.patchValue({
      jobCompany: data.jobCompany,
      jobCompanyName: data.jobCompanyName,
      logo: data.logo,
      image: data.logo,
      title: data.title,
      description: data.description,
      city: data.city,
      state: data.state,
      zip: data.zip,
      applyLink: data.applyLink,
      education: data.education,
      jobType: data.jobType,
      experience: data.experience,
      category: data.category,
      notes: data.notes,
      salaryRangeLow: data.salaryRangeLow,
      salaryRangeHigh: data.salaryRangeHigh,
      skills: data.skills,
      responsibilities: data.responsibilities,
      expired: data.expired
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      jobCompany: [''],
      jobCompanyName: [''],
      logo: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      applyLink: ['', [Validators.required]],
      education: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      category: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      salaryRangeLow: ['', [Validators.required]],
      salaryRangeHigh: ['', [Validators.required]],
      image: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      expired: [false]
    });
  }

  getJobId() {
    this.subscription.push(
      this.adminService.getJobById(this.jobId).subscribe(res => {
        this.jobDetails = res;
        this.skills = res.skills;
        this.responsibilities = res.responsibilities;
        this.getCategoryById(res.category);
        this.setFormValues(res);
      })
    )
  }

  getCategoryById(id: string): void {
    this.subscription.push(
      this.adminService.getAllCategoryById(id).subscribe((res: any) => {
          this.allPrimaryCategories = [...this.allPrimaryCategories, ...[res]];
          this.form.controls['category'].setValue(res._id);
      })
    );
  }

  getCategories(): void {
    this.subscription.push(
      this.adminService.getAllCategories(this.pageSize, this.offset).subscribe((res: any) => {
        const newData = res.categories;
        this.lastPage = res.totalCount;

        this.allPrimaryCategories = [...this.allPrimaryCategories, ...newData];
        this.parimaryCategories = newData;

      })
    );
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
        if (control === 'skills' || control === 'responsibilities') {
          data[control] = JSON.stringify(this.form.controls[control].value);
        } else {
          data[control] = this.form.controls[control].value;
        }
      }
    }
    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
    }

    this.loading = true;
    if (this.jobId) {
      this.update(data);
    } else {
      const userResponse = confirm("Warning: Once you publish this job, it will go live. Do you want to proceed?");
      if (userResponse) {
        this.submit(data);
      }
    }

  }

  submit(data: any): void {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    this.subscription.push(
      this.adminService.createJobOpportunity(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        alert('New job opportunity added successfully.');
        this.initForm();
        this.skills = [];
        this.responsibilities = [];
        this.fileName = '';
      })
    );
  }

  update(data: any): void {
    const formData = new FormData()
    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('id', this.jobDetails._id)
    this.subscription.push(
      this.adminService.updateJobOpportunity(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('Job opportunity updated successfully.');
      }, err => {
        console.log(err)
        if (err.status === 201) {
          alert('Job opportunity updated successfully.');
        }
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

  add(event: MatChipInputEvent, array: any, name: string): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      array.push(value);
      // array.push({name: value});
    }

    this.form.controls[name].setValue(array);

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any, array: any, name: string): void {
    const index = array.indexOf(fruit);

    if (index >= 0) {
      array.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
      this.form.controls[name].setValue(array);
    }
  }

  edit(fruit: any, event: MatChipEditedEvent, array: any, name: string) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit, array, name);
      return;
    }

    // Edit existing fruit
    const index = array.indexOf(fruit);
    if (index >= 0) {
      array[index] = value;
    }
    this.form.controls[name].setValue(array);
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
