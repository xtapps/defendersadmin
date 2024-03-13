import { Location } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-franchises',
  templateUrl: './add-new-franchises.component.html',
  styleUrls: ['./add-new-franchises.component.scss']
})
export class AddNewFranchisesComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  fileName = '';
  subscription: Subscription[] = [];
  receivedData: any;
  editMode = false;

  private formBuilder = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);


  ngOnInit(): void {
    this.initForm();
    this.editMode = this.activatedRoute.snapshot.queryParams['editMode'];
    if (this.activatedRoute.snapshot.queryParams['editMode'] === 'true') {
      this.editMode = true
      this.setFormValues();
    } else {
      this.editMode = false;
    }
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      franchiseName: ['', [Validators.required]],
      franchiseImage: [''],
      website: [''],
    })
  }

  setFormValues(): void {
    const datas = window.history.state;
    this.fileName = datas.franchiseImage;

    this.form.patchValue({
      franchiseName: datas.franchiseName,
      website: datas.website,
      franchiseImage: datas.franchiseImage
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
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

  // onFileChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const files = inputElement?.files;

  //   if (files && files.length > 0) {
  //     this.fileName = files[0].name;
  //     this.form.controls['franchiseImage'].setValue(files[0]);
  //   } else {
  //     this.fileName = ''; // Reset if no file selected
  //     this.form.controls['franchiseImage'].setValue('');
  //   }
  // }

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
      }
    }
    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
    }

    if (this.editMode) {
      this.update(data);
    } else {
      this.submit(data);
    }
  }

  submit(data: any): void {
    console.log(data);
    const formData = new FormData();
    for (const key in data) {
      if (key === 'franchiseImage') {
        formData.append('image', data[key]);  
      } else {
        formData.append(key, data[key]);
      }
    }
    this.subscription.push(
      this.adminService.createFranchises(formData).subscribe(res => {
        alert('Franchises added successfully.');
        this.initForm();
        this.fileName = '';
      })
    );
  }

  update(data: any): void {
    data['id'] = window.history.state._id;
    const formData = new FormData();
    for (const key in data) {
      if (key === 'franchiseImage') {
        formData.append('image', data[key]);  
      } else {
        formData.append(key, data[key]);
      }
    }
    this.subscription.push(
      this.adminService.updateFranchises(formData).subscribe(res => {
        alert('Franchises updated successfully.');
      }, err => {
        if (err.status === 201) {
          alert('Franchises updated successfully.');
        }
      })
    )
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
