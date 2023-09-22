import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-new-website',
  templateUrl: './add-new-website.component.html',
  styleUrls: ['./add-new-website.component.scss']
})
export class AddNewWebsiteComponent {

  form!: FormGroup;
  propertyType!: string;
  loading = false;
  subscription: Subscription[] = [];
  fileName = '';


  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);
  private adminService = inject(AdminService);
  private router = inject(Router);


  ngOnInit(): void {
    this.initForm();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    this.form.patchValue({
      propertyType: this.propertyType
    })
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
      website: [''],
      propertyType: [''],
      orgType: ['commercial'],
      description: [''],
      discount: [''],
      discountDisclaimer: ['']
    })
  }

  checkValidation(fieldName: string): boolean {
    return this.form.controls[fieldName].invalid && this.form.controls[fieldName].touched
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
    return;
    this.loading = true;
    this.subscription.push(
      this.adminService.createPartner(data).pipe(
        finalize(() => { this.loading = false })
      ).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/admin/franchises');
      })
    )

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

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }

}
