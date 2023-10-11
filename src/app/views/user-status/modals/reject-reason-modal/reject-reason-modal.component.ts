import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-reject-reason-modal',
  templateUrl: './reject-reason-modal.component.html',
  styleUrls: ['./reject-reason-modal.component.scss']
})
export class RejectReasonModalComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  form!: FormGroup;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedDatas: { id: string, status: string },
    private fb: FormBuilder,
    private adminService: AdminService,
    private _dialogRef: MatDialogRef<RejectReasonModalComponent>
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      rejectReason: ['', Validators.required]
    })
  }

  formBody() {
    const formValue = this.form.value;
    return {
      rejectReason: formValue.rejectReason,
      userId: this.injectedDatas.id,
      userStatus: this.injectedDatas.status
    }
  }

  onSubmit(): void {
    console.log(this.formBody());
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.subscription.push(
      this.adminService.updateUserStatus(this.formBody()).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        if (res.success) {
          this._dialogRef.close({ success: true })
        }
      })
    );
  }

  close(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => {
      el.unsubscribe()
    });
  }

}
