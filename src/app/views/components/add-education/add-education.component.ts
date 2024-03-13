import { Location } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscriptions: Subscription[] = [];
  editMode = false;
  receivedData: any;
  fileName = '';
  loading: boolean = false;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private location = inject(Location);

  ngOnInit(): void {
    this.initForm();
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    if (encodedData) {
      this.editMode = true;
      this.setFormValues();
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      website: [''],
      description: ['']
    });
  }

  setFormValues(): void {
    const data = window.history.state;
    this.fileName = data.logo;
    this.form.patchValue({
      title: data.title,
      logo: data.logo,
      website: data.website,
      description: data.description
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  // onFileChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const files = inputElement?.files;

  //   if (files && files.length > 0) {
  //     this.fileName = files[0].name;
  //     this.form.controls['logo'].setValue(files[0]);
  //   } else {
  //     this.fileName = ''; // Reset if no file selected
  //     this.form.controls['logo'].setValue('');
  //   }
  // }

  onFileChange(file: any) {
    if (file) {
      this.fileName = file.name;
      this.form.controls['image'].setValue(file);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['image'].setValue('');
    }
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
      if (key === 'logo') {
        formData.append('image', data[key]);  
      } else {
        formData.append(key, data[key]);
      }
    }
    this.subscriptions.push(
      this.adminService.createEducation(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('Education added successfully.');
        this.initForm();
        this.fileName = '';
      })
    );
  }

  update(data: any): void {
    data['id'] = window.history.state._id;
    const formData = new FormData();
    for (const key in data) {
      if (key === 'logo') {
        formData.append('image', data[key]);  
      } else {
        formData.append(key, data[key]);
      }
    }
    this.subscriptions.push(
      this.adminService.updateEducation(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        alert('Education updated successfully.');
      }, err => {
        if (err.status === 201) {
          alert('Education updated successfully.');
        }
      })
    );
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(el => { el.unsubscribe() });
  }

}
