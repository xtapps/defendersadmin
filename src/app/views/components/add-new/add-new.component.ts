import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      name:[''],
      email:[''],
      address1:[''],
      address2:[''],
      city:[''],
      state:[''],
      zip:[''],
      country:[''],
      description:[''],
      phone:[''],
    })
  }

  submit(): void {

  }

}
