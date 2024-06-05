import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss']
})
export class NotificationFormComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  form!: FormGroup;
  loading = false;
  fileName = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private fb: FormBuilder,
    private adminService: AdminService,
    private _dialogRef: MatDialogRef<NotificationFormComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['']
    })
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      if (!this.form.value.image || this.form.value.image === '') {
        this.adminService.imageValidation.next(true);
      }
      return;
    }

    if (!this.form.value.image || this.form.value.image === '') {
      this.adminService.imageValidation.next(true);
      return;
    }

    this.loading = true;
    const formData = new FormData()
    for (const key in this.form.value) {
      formData.append(key, this.form.value[key]);
      console.log(this.form.value[key])
    }
    formData.append('id', this.data.id);
    this.subscription.push(
      this.adminService.sendNotification(formData).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(() => {
        alert('Notification has been sent successfully');
        this.close();
      }, err => {
        console.log(err);
        if (err.status !== 201) {
          alert('Something went wrong');
        } else {
          alert('Notification has been sent successfully');
          this.close();
        }
      })
    );
  }

  close(): void {
    this._dialogRef.close();
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
    this.subscription.forEach(el => {
      el.unsubscribe()
    });
  }
}