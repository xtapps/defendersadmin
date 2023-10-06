import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  editMode = false;
  subscription: Subscription[] = [];
  receivedData: any;
  fileName = '';

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.initForm();
    const encodedData = this.route.snapshot.queryParamMap.get('data');
    if (encodedData) {
      this.editMode = true;
      this.receivedData = JSON.parse(decodeURIComponent(encodedData));
      this.setFormValues(this.receivedData);
    }
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      categoryType: ['partner'],
      website: [''],
      appSection: ['partner'],
      categoryIcon: ['']
    })
  }

  setFormValues(datas: any): void {
    console.log(datas);

    this.form.patchValue({
      name: datas.franchiseName,
      website: datas.website
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

  }

  ngOnDestroy(): void {
    this.subscription.forEach(el => { el.unsubscribe() });
  }


}
