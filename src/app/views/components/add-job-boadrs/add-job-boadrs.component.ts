import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-job-boadrs',
  templateUrl: './add-job-boadrs.component.html',
  styleUrls: ['./add-job-boadrs.component.scss']
})
export class AddJobBoadrsComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  subscription: Subscription[] = [];
  editMode = false;
  receivedData: any;
  fileName = '';

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initForm();
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    if (encodedData) {
      this.editMode = true;
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      image: ['', [Validators.required]],
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
      this.form.controls['image'].setValue(files[0]);
    } else {
      this.fileName = ''; // Reset if no file selected
      this.form.controls['image'].setValue('');
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    return;
    const fromValue = this.form.value;
    const formData = new FormData();
    formData.append('image', fromValue.image);
    this.subscription.push(
      this.adminService.createJobBoards(formData).subscribe(res => {
        this.router.navigateByUrl('/admin/franchises');
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
