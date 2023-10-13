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
    this.fileName = datas.franchiseName;

    this.form.patchValue({
      franchiseName: datas.franchiseName,
      website: datas.website,
      franchiseImage: datas.franchiseImage
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;

    if (files && files.length > 0) {
      this.fileName = files[0].name;
      this.form.controls['franchiseImage'].setValue(files[0]);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['franchiseImage'].setValue('');
    }
  }

  submit(): void {
    if (this.editMode) {
      this.onUpdate();
    } else {
      this.onSubmit();
    }
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
      }
    }
    console.log(data);
    this.subscription.push(
      this.adminService.createFranchises(data).subscribe(res => {
        this.router.navigateByUrl('/admin/franchises');
      })
    )

  }

  onUpdate(): void {
    const data: any = {};
    // for (const control in this.form.controls) {
    //   if (this.form.controls[control].value === '' || this.form.controls[control].value === null) {
    //     data[control] = ' ';
    //   } else {
    //     data[control] = this.form.controls[control].value;
    //   }
    // }
    data['id'] = this.receivedData._id;
    data['name'] = 'test name'
    console.log(data);
    this.subscription.push(
      this.adminService.updateFranchises(data).subscribe(res => {
        if (res.succeess) {
          alert('Updated Successfully');
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
