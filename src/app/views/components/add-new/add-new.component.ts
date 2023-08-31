import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  form!: FormGroup;
  propertyType!: string;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.propertyType = this.activatedRoute.snapshot.queryParams['type'];
    console.log(this.propertyType);
    this.form.patchValue({
      propertyType: this.propertyType
    })

  }

  initForm(): void {
    this.form = this.fb.group({
      locationName: [''],
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
      country: [''],
      county: [''],
      phone: [''],
      email: [''],
      website: [''],
      localContact: [''],
      franchiseTag: [''],
      umbrellaTag: [''],
      licenseNumber: [''],
      discount: [''],
      discountClaimer: [''],
      groupCode: [''],
      primeryCategory: [''],
      secondaryCategory: [''],
      description: [''],
    })
  }



  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);

  }

}
